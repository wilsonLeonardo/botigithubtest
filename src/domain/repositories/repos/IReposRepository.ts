import { IRepo } from '@domain/schema/Repos';

export default interface IReposRepository {
  listRepos(): Promise<Array<IRepo>>;
  getRepoById(id: number): Promise<IRepo | null>;
  save(repo: IRepo): Promise<IRepo>;
  cleanRepository(): Promise<void>;
}
