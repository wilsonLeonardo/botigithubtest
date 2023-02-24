/* eslint-disable max-len */
import { Router } from 'express';
import PingControllerFactory from '@infrastructure/factories/controller/PingControllerFactory';
import CreateTopFiveReposControllerFactory from '@infrastructure/factories/controller/CreateTopFiveReposControllerFactory';
import GitHubServiceFactory from '@infrastructure/factories/service/GitHubServiceFactory';
import { validateSchema } from './middlewares/ValidateSchema';
import ListTopFiveReposControllerFactory from '@infrastructure/factories/controller/ListTopFiveReposControllerFactory';
import GetRepoDetailsControllerFactory from '@infrastructure/factories/controller/GetRepoDetailsControllerFactory';

const routerV1 = Router();

(async () => {
  const gitHubService = await GitHubServiceFactory.make();
  routerV1.get('/ping', PingControllerFactory.make().execute);
  routerV1.post(
    '/repository/top-five',
    validateSchema('createTopFiveRepos', 'body'),
    (await CreateTopFiveReposControllerFactory.make(gitHubService)).execute,
  );
  routerV1.get('/repository/top-five', (await ListTopFiveReposControllerFactory.make(gitHubService)).execute);
  routerV1.get(
    '/repository/:repoId/details',
    validateSchema('getRepoDetails', 'params'),
    (await GetRepoDetailsControllerFactory.make(gitHubService)).execute,
  );
})();

export default routerV1;
