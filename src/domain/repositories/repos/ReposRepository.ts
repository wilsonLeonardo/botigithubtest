import { IRepo } from '@domain/schema/Repos';
import { Model } from 'mongoose';

import IReposRepository from './IReposRepository';

export default class ReposRepository implements IReposRepository {
  constructor(private reposModel: Model<IRepo>) {}

  async listRepos(): Promise<IRepo[]> {
    return this.reposModel.find();
  }

  async getRepoById(id: number): Promise<IRepo | null> {
    return this.reposModel.findOne({ _id: id });
  }
  async save(repo: IRepo): Promise<IRepo> {
    const repositoryCreated = this.reposModel.create(repo);

    return repositoryCreated;
  }

  async cleanRepository(): Promise<void> {
    await this.reposModel.deleteMany({});
  }
}
