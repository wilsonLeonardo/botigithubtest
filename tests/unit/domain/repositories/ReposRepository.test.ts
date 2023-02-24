import { Model } from 'mongoose';
import ReposRepository from '../../../../src/domain/repositories/repos/ReposRepository';
import { IRepo } from '../../../../src/domain/schema/Repos';
import { repoMock } from '../../../mocks/RepoSchemaMock';
import { faker } from '@faker-js/faker';

describe('ReposRepository', () => {
  let mongodbMock = {} as Model<IRepo>;

  beforeEach(() => {
    mongodbMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
    } as unknown as Model<IRepo>;
  });

  describe('Save #unit', () => {
    it('should save the repository', async () => {
      mongodbMock.create = jest.fn().mockImplementation(() => Promise.resolve(repoMock[0]));
      const instance = new ReposRepository(mongodbMock);
      const repo = await instance.save(repoMock[0]);

      expect(repo).toBe(repoMock[0]);
      expect(mongodbMock.create).toHaveBeenCalledWith(repoMock[0]);
    });
  });

  describe('List #unit', () => {
    it('should list repositories from database', async () => {
      mongodbMock.find = jest.fn().mockImplementation(() => Promise.resolve(repoMock));
      const instance = new ReposRepository(mongodbMock);
      const repos = await instance.listRepos();

      expect(repos).toBe(repoMock);
      expect(mongodbMock.find).toHaveBeenCalled();
    });
  });

  describe('Get repository by id #unit', () => {
    it('should get repository from database', async () => {
      const repoId = faker.datatype.number();
      mongodbMock.findOne = jest.fn().mockImplementation(() => Promise.resolve(repoMock[0]));
      const instance = new ReposRepository(mongodbMock);
      const repo = await instance.getRepoById(repoId);

      expect(repo).toBe(repoMock[0]);
      expect(mongodbMock.findOne).toHaveBeenCalledWith({ _id: repoId });
    });
    it('should return null when repository is not found', async () => {
      const repoId = faker.datatype.number();
      mongodbMock.findOne = jest.fn().mockImplementation(() => Promise.resolve(null));
      const instance = new ReposRepository(mongodbMock);
      const repo = await instance.getRepoById(repoId);

      expect(repo).toBeNull();
      expect(mongodbMock.findOne).toHaveBeenCalledWith({ _id: repoId });
    });
  });

  describe('Clean Repository #unit', () => {
    it('should clean database', async () => {
      const instance = new ReposRepository(mongodbMock);
      await instance.cleanRepository();

      expect(mongodbMock.deleteMany).toHaveBeenCalled();
    });
  });
});
