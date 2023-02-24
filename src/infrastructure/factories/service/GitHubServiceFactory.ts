import IReposRepository from '@domain/repositories/repos/IReposRepository';
import IGitHubApiRepository from '@domain/repositories/githubApi/IGitHubApiRepository';
import GitHubService from '@service/GitHubService';
import IGitHubService from '@service/IGitHubService';
import { ILogger } from '../../logger/ILogger';
import ReposRepositoryFactory from '../repositories/ReposRepositoryFactory';
import GitHubApiRepositoryFactory from '../repositories/GitHubApiRepositoryFactory';
import LoggerFactory from '../logger/LoggerFactory';
import IGitHubRequester from '@infrastructure/http/IGitHubRequester';
import GitHubRequesterFactory from '../http/GitHubRequesterFactory';

export default class GitHubServiceFactory {
  private static service: IGitHubService;

  static async make(
    reposRepository?: IReposRepository,
    gitRepository?: IGitHubApiRepository,
    logger?: ILogger,
    gitRequester?: IGitHubRequester,
  ): Promise<IGitHubService> {
    if (!this.service) {
      const gitHubRequester = gitRequester || (await GitHubRequesterFactory.make());
      this.service = new GitHubService(
        reposRepository || (await ReposRepositoryFactory.make()),
        gitRepository || (await GitHubApiRepositoryFactory.make(gitHubRequester, logger || LoggerFactory.make())),
      );
    }

    return this.service;
  }
}
