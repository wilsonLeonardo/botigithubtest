import { IRepo } from '../../src/domain/schema/Repos';

import IReposRepository from '../../src/domain/repositories/repos/IReposRepository';

export default class ReposRepositoryMock implements IReposRepository {
  async listRepos(): Promise<IRepo[]> {
    return [];
  }

  async getRepoById(_id: number): Promise<IRepo | null> {
    return null;
  }
  async save(_repo: IRepo): Promise<IRepo> {
    return {} as IRepo;
  }

  async cleanRepository(): Promise<void> {}
}
