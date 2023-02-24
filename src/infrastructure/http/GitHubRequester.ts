import { AxiosResponse } from 'axios';
import HttpRequester from './HttpRequester';
import IGitHubRequester from './IGitHubRequester';

export default class GitHubRequester extends HttpRequester implements IGitHubRequester {
  defaultHeaders = {};

  constructor(gitPrefixURL: string) {
    super(gitPrefixURL);
  }
  async getTopRepositoryByLanguage(language: string): Promise<AxiosResponse> {
    return await this.makeRequest(
      'get',
      `/search/repositories?q=language:${language}&order=desc&per_page=1&sort=stars`,
      undefined,
      this.defaultHeaders,
    );
  }
  async getRepositorieDetailsById(id: number): Promise<any> {
    return await this.makeRequest('get', `/repositories/${id}`, undefined, this.defaultHeaders);
  }
}
