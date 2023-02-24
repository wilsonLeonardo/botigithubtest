import IGitHubApiRepository from './IGitHubApiRepository';
import { ILogger } from '@infrastructure/logger/ILogger';
import InternalServerError from '../../exceptions/InternalServerError';
import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import IGitHubRequester from '@infrastructure/http/IGitHubRequester';
import NotFoundError from '@domain/exceptions/NotFoundError';

export default class GitHubApiRepository implements IGitHubApiRepository {
  private requester: IGitHubRequester;
  private logger: ILogger;

  constructor(requester: IGitHubRequester, logger: ILogger) {
    this.requester = requester;
    this.logger = logger;
  }

  async getTopFiveRepositories(languages: Array<string>): Promise<any> {
    try {
      const response = await Promise.all(
        languages.map((language) => {
          return this.requester.getTopRepositoryByLanguage(language);
        }),
      );

      const topFiveRepoData = response.map((response) => response.data.items[0]);
      return topFiveRepoData;
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      this.logger.error(`Error when getting top five repositories - Extra: ${JSON.stringify(errorInfo)}`);

      if (err.response.status === 404) {
        return [];
      }

      throw new InternalServerError('Error when getting top five repositories');
    }
  }
  async getRepositorieDetailsById(id: number): Promise<any> {
    try {
      const response = await this.requester.getRepositorieDetailsById(id);

      return response.data;
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      const message = 'Error when getting repository details';

      this.logger.error(`${message} - Extra: ${JSON.stringify(errorInfo)}`);

      if (err.response.status === 404) {
        throw new NotFoundError('Repository not found!');
      }

      throw new InternalServerError(message);
    }
  }
}
