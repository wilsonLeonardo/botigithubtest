import * as http from 'http';
import express, { RequestHandler } from 'express';
import { ILogger } from '@infrastructure/logger/ILogger';
import { AppConfig } from '@config/AppConfig';

interface AppOptions {
  port: number;
  routes: express.Router;
  middlewares?: RequestHandler[];
  logger: ILogger;
  environment: string;
}

export default class App {
  app: express.Express;
  port: number;
  routes: express.Router;
  logger: ILogger;
  middlewares: RequestHandler[];
  environment: string;

  constructor(options: AppOptions) {
    this.app = express();
    this.port = options.port;
    this.routes = options.routes;
    this.logger = options.logger;
    this.middlewares = options.middlewares || [];
    this.environment = options.environment || '';

    this.handlerMiddlewares();
    this.handlerRoutes();
  }

  private handlerRoutes(): void {
    this.app.use(this.routes);
  }

  private handlerMiddlewares(): void {
    this.middlewares.forEach((value) => this.app.use(value));
  }

  async listen(): Promise<http.Server> {
    return this.app.listen(this.port, () => {
      this.logger.info(
        `Application ${AppConfig.APPLICATION_NAME} is running. Listening on http://localhost:${this.port}`,
      );
      this.logger.info('Press CTRL+C to exit');
    });
  }
}
