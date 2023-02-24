import IReposRepository from '@domain/repositories/repos/IReposRepository';
import IGitHubApiRepository from '@domain/repositories/githubApi/IGitHubApiRepository';
import { IRepo } from '@domain/schema/Repos';
import IGitHubService from './IGitHubService';
import NotFoundError from '@domain/exceptions/NotFoundError';

export default class GitHubService implements IGitHubService {
  constructor(private reposRepository: IReposRepository, private gitRepository: IGitHubApiRepository) {}

  async findAndSaveTopFiveRepos(languages: string[]): Promise<Array<IRepo>> {
    const reposFromGitHub = await this.gitRepository.getTopFiveRepositories(languages);

    await this.reposRepository.cleanRepository();

    const filteredRepos = this.getMainInfosFromApiResult(reposFromGitHub);

    const reposSaved = await Promise.all(filteredRepos.map((repo) => this.reposRepository.save(repo)));
    return reposSaved;
  }

  async list(): Promise<any> {
    return await this.reposRepository.listRepos();
  }

  async getRepoDetails(repoId: number): Promise<any> {
    const repository = await this.reposRepository.getRepoById(repoId);

    if (!repository) {
      throw new NotFoundError(`Repository with id: ${repoId} is not saved!`);
    }

    return this.gitRepository.getRepositorieDetailsById(repoId);
  }

  private getMainInfosFromApiResult(repos: Array<any>): Array<IRepo> {
    return repos.map((repo) => ({
      _id: repo.id,
      full_name: repo.full_name,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
    }));
  }
}
