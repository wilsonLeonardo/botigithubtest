import { RequestHandler } from 'express';
import { CREATED } from 'http-status';
import { ILogger } from '@infrastructure/logger/ILogger';
import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import IGitHubService from '@service/IGitHubService';

export default class CreateTopFiveReposController {
  constructor(private gitHubService: IGitHubService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { programmingLanguages } = request.body;

      const repositories = await this.gitHubService.findAndSaveTopFiveRepos(programmingLanguages);

      return response.status(CREATED).json({ repositories });
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      this.logger.error(`fail to find and save the top five repositories`);

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  };
}
