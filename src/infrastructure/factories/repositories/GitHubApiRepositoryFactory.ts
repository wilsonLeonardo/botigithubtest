import IGitHubApiRepository from '@domain/repositories/githubApi/IGitHubApiRepository';
import GitHubApiRepository from '@domain/repositories/githubApi/GitHubApiRepository';
import IGitHubRequester from '../../http/IGitHubRequester';
import { ILogger } from '../../logger/ILogger';

export default class GitHubApiRepositoryFactory {
  private static gitRepository: IGitHubApiRepository;

  static async make(gitRequester: IGitHubRequester, logger: ILogger): Promise<IGitHubApiRepository> {
    if (this.gitRepository) {
      return this.gitRepository;
    }
    this.gitRepository = new GitHubApiRepository(gitRequester, logger);
    return this.gitRepository;
  }
}
