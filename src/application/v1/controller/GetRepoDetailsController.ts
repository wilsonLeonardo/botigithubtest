import { RequestHandler } from 'express';
import { OK } from 'http-status';
import { ILogger } from '@infrastructure/logger/ILogger';
import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import IGitHubService from '@service/IGitHubService';

export default class GetRepoDetailsController {
  constructor(private gitHubService: IGitHubService, private logger: ILogger) {}

  public execute: RequestHandler = async (request, response) => {
    try {
      const { repoId } = request.params;

      const repository = await this.gitHubService.getRepoDetails(Number(repoId));

      return response.status(OK).json(repository);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      this.logger.error(`fail to get repository details`);

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  };
}
