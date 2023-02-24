import GitHubServiceFactory from '../../../src/infrastructure/factories/service/GitHubServiceFactory';
import GitHubApiRepositoryMock from '../../mocks/GitHubApiRepositoryMock';
import ReposRepositoryMock from '../../mocks/ReposRepositoryMock';
import { repoMock, programmingLanguages } from '../../mocks/RepoSchemaMock';
import { faker } from '@faker-js/faker';
import NotFoundError from '../../../src/domain/exceptions/NotFoundError';

const gitRepository = new GitHubApiRepositoryMock();
const reposRepository = new ReposRepositoryMock();

describe('GitHubService', () => {
  describe('findAndSaveTopFiveRepos #unit', () => {
    it('should create the tops repositories from each language', async () => {
      gitRepository.getTopFiveRepositories = jest.fn().mockResolvedValueOnce(repoMock);
      reposRepository.cleanRepository = jest.fn();
      reposRepository.save = jest.fn().mockResolvedValue(() => {
        return Promise.resolve(repoMock);
      });

      const service = await GitHubServiceFactory.make(reposRepository, gitRepository);

      const result = await service.findAndSaveTopFiveRepos(programmingLanguages);

      expect(result).toBeDefined();
      expect(result).toHaveLength(5);
      expect(reposRepository.save).toHaveBeenCalled();
      expect(reposRepository.cleanRepository).toHaveBeenCalled();
      expect(gitRepository.getTopFiveRepositories).toHaveBeenCalled();
    });
  });
  describe('list #unit', () => {
    it('should list repositories from database', async () => {
      reposRepository.listRepos = jest.fn().mockResolvedValue(repoMock);

      const service = await GitHubServiceFactory.make(reposRepository, gitRepository);

      const result = await service.list();

      expect(result).toStrictEqual(repoMock);
      expect(reposRepository.listRepos).toHaveBeenCalled();
    });
  });
  describe('getRepoDetails #unit', () => {
    it('should get repository details', async () => {
      reposRepository.getRepoById = jest.fn().mockResolvedValue(repoMock[0]);
      gitRepository.getRepositorieDetailsById = jest.fn().mockResolvedValue({ some: true });

      const service = await GitHubServiceFactory.make(reposRepository, gitRepository);

      const repoId = faker.datatype.number();

      const result = await service.getRepoDetails(repoId);

      expect(result).toStrictEqual({ some: true });
      expect(reposRepository.getRepoById).toHaveBeenCalled();
      expect(gitRepository.getRepositorieDetailsById).toHaveBeenCalled();
    });
    it('should throw not found error', async () => {
      reposRepository.getRepoById = jest.fn().mockImplementation(() => {
        return Promise.resolve(null);
      });
      gitRepository.getRepositorieDetailsById = jest.fn();

      const service = await GitHubServiceFactory.make(reposRepository, gitRepository);

      const repoId = faker.datatype.number();

      await expect(service.getRepoDetails(repoId)).rejects.toThrow(
        new NotFoundError(`Repository with id: ${repoId} is not saved!`),
      );

      expect(reposRepository.getRepoById).toHaveBeenCalled();
      expect(gitRepository.getRepositorieDetailsById).not.toHaveBeenCalled();
    });
  });
});
