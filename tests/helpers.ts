/* eslint-disable max-len */
import supertest from 'supertest';
import { RequestHandler, Router, json } from 'express';

import App from '../src/application/App';
import { AppConfig } from '../src/config/AppConfig';
import { validateSchema } from '../src/application/v1/middlewares/ValidateSchema';
import PingControllerFactory from '../src/infrastructure/factories/controller/PingControllerFactory';
import CreateTopFiveReposControllerFactory from '../src/infrastructure/factories/controller/CreateTopFiveReposControllerFactory';
import GetRepoDetailsControllerFactory from '../src/infrastructure/factories/controller/GetRepoDetailsControllerFactory';
import ListTopFiveReposControllerFactory from '../src/infrastructure/factories/controller/ListTopFiveReposControllerFactory';
import LoggerFactory from '../src/infrastructure/factories/logger/LoggerFactory';
import GitHubServiceMock from './mocks/GitHubServiceMock';
import IGitHubService from '../src/service/IGitHubService';

interface MockServerOptions {
  gitHubService?: IGitHubService;
}

const routes = async (options: MockServerOptions): Promise<Router> => {
  const gitHubService = options.gitHubService || new GitHubServiceMock();

  const router = Router();

  router.get('/v1/ping', PingControllerFactory.make().execute);
  router.post(
    '/v1/repository/top-five',
    validateSchema('createTopFiveRepos', 'body'),
    (await CreateTopFiveReposControllerFactory.make(gitHubService)).execute,
  );
  router.get('/v1/repository/top-five', (await ListTopFiveReposControllerFactory.make(gitHubService)).execute);
  router.get(
    '/v1/repository/:repoId/details',
    validateSchema('getRepoDetails', 'params'),
    (await GetRepoDetailsControllerFactory.make(gitHubService)).execute,
  );
  return router;
};

export const mockApp = async (options: MockServerOptions): Promise<App> => {
  const middlewares: RequestHandler[] = [];

  middlewares.push(json());

  const app = new App({
    port: AppConfig.PORT,
    routes: await routes(options),
    logger: LoggerFactory.make(),
    middlewares,
    environment: AppConfig.APP_ENVIRONMENT,
  });

  return app;
};

export const mockServer = async (options: MockServerOptions): Promise<supertest.SuperTest<supertest.Test>> => {
  const app = await mockApp(options);
  return supertest(app.app);
};
