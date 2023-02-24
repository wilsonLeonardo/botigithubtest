import IGitHubApiRepository from '../../src/domain/repositories/githubApi/IGitHubApiRepository';

export default class GitHubApiRepositoryMock implements IGitHubApiRepository {
  async getTopFiveRepositories(_languages: Array<string>): Promise<any> {
    return {};
  }
  async getRepositorieDetailsById(_id: number): Promise<any> {
    return {};
  }
}
