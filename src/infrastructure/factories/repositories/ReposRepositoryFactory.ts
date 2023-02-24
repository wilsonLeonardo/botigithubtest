import { model, Model } from 'mongoose';

import IReposRepository from '@domain/repositories/repos/IReposRepository';
import ReposRepository from '@domain/repositories/repos/ReposRepository';
import { IRepo, Repo } from '@domain/schema/Repos';

export default class ReposRepositoryFactory {
  private static repository: IReposRepository;
  static async make(): Promise<IReposRepository> {
    const repoModel: Model<IRepo> = model<any>('Repo', Repo);

    if (this.repository) {
      return this.repository;
    }

    this.repository = new ReposRepository(repoModel);
    return this.repository;
  }
}
