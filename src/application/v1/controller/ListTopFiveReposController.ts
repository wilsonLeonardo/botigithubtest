import { RequestHandler } from 'express';
import { OK } from 'http-status';
import { ILogger } from '@infrastructure/logger/ILogger';
import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import IGitHubService from '@service/IGitHubService';

export default class ListTopFiveReposController {
  constructor(private gitHubService: IGitHubService, private logger: ILogger) {}

  public execute: RequestHandler = async (_request, response) => {
    try {
      const repositories = await this.gitHubService.list();

      return response.status(OK).json({ repositories });
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      this.logger.error(`fail to list the top five repositories`);

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  };
}
