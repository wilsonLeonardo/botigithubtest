import { AxiosResponse } from 'axios';

export default interface IGitHubRequester {
  getTopRepositoryByLanguage(language: string): Promise<AxiosResponse>;
  getRepositorieDetailsById(id: number): Promise<any>;
}
