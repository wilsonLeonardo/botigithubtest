import { IRepo } from '../../src/domain/schema/Repos';
import IGitHubService from '../../src/service/IGitHubService';

export default class GitHubServiceMock implements IGitHubService {
  async findAndSaveTopFiveRepos(_languages: string[]): Promise<Array<IRepo>> {
    return [];
  }

  async list(): Promise<any> {
    return [];
  }

  async getRepoDetails(_repoId: number): Promise<any> {
    return {};
  }
}
