import { IRepo } from '@domain/schema/Repos';

export default interface IGitHubService {
  findAndSaveTopFiveRepos(languages: Array<string>): Promise<Array<IRepo>>;
  list(): Promise<any>;
  getRepoDetails(repoId: number): Promise<any>;
}
