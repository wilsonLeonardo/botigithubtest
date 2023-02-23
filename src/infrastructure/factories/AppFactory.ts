import { json, RequestHandler, Router } from 'express';
import App from '../../application/App';
import { AppConfig } from '@config/AppConfig';
import LoggerFactory from './logger/LoggerFactory';
import { ILogger } from '@infrastructure/logger/ILogger';

export default class AppFactory {
  static async make(routes: Router): Promise<App> {
    const logger: ILogger = LoggerFactory.make();
    const middlewares: RequestHandler[] = [];

    middlewares.push(json());

    return new App({
      port: AppConfig.PORT,
      routes,
      logger,
      middlewares,
      environment: AppConfig.APP_ENVIRONMENT,
    });
  }
}
