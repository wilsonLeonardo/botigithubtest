import GitHubApiRepository from '../../../../src/domain/repositories/githubApi/GitHubApiRepository';
import IGitHubRequester from '../../../../src/infrastructure/http/IGitHubRequester';
import { ILogger } from '../../../../src/infrastructure/logger/ILogger';
import LoggerMock from '../../../mocks/LoggerMock';
import { AxiosResponse } from 'axios';
import NotFoundError from '../../../../src/domain/exceptions/NotFoundError';
import { IRepo } from '../../../../src/domain/schema/Repos';
import InternalServerError from '../../../../src/domain/exceptions/InternalServerError';
import { faker } from '@faker-js/faker';

describe('GitHubApiRepository', () => {
  const loggerMock: ILogger = new LoggerMock();

  describe('getTopRepositoryByLanguage #unit', () => {
    it('should return repository querying by programming language', async () => {
      const languages = ['js'];
      const githubRequesterMock: IGitHubRequester = {
        getTopRepositoryByLanguage: async (language: string): Promise<AxiosResponse> => {
          return {
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            data: { items: [{ full_name: '', language, stargazers_count: 5 } as IRepo] },
          };
        },
        getRepositorieDetailsById: async (_id: number): Promise<AxiosResponse> => {
          return {
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            data: {},
          };
        },
      };
      const instance = new GitHubApiRepository(githubRequesterMock, loggerMock);
      const repositories = await instance.getTopFiveRepositories(languages);
      expect(repositories).toHaveLength(1);
      expect(repositories[0].language).toBe(languages[0]);
    });
    it('should return a empty array when requester return 404', async () => {
      const languages = ['js'];
      const githubRequesterMock: IGitHubRequester = {
        getTopRepositoryByLanguage: async (_language: string): Promise<AxiosResponse> => {
          throw {
            response: { status: 404 },
          };
        },
        getRepositorieDetailsById: async (_id: number): Promise<AxiosResponse> => {
          return {
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            data: {},
          };
        },
      };
      const loggerErrorSpy = jest.spyOn(loggerMock, 'error');
      const instance = new GitHubApiRepository(githubRequesterMock, loggerMock);
      const repositories = await instance.getTopFiveRepositories(languages);
      expect(repositories).toHaveLength(0);
      expect(loggerErrorSpy).toHaveBeenCalled();
    });
    it('should throw internal server error when a unexpected error happens', async () => {
      const languages = ['js'];
      const githubRequesterMock: IGitHubRequester = {
        getTopRepositoryByLanguage: async (_language: string): Promise<AxiosResponse> => {
          throw {
            response: { status: 500 },
          };
        },
        getRepositorieDetailsById: async (_id: number): Promise<AxiosResponse> => {
          return {
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            data: {},
          };
        },
      };
      const loggerErrorSpy = jest.spyOn(loggerMock, 'error');
      const instance = new GitHubApiRepository(githubRequesterMock, loggerMock);
      await expect(instance.getTopFiveRepositories(languages)).rejects.toThrow(
        new InternalServerError('Error when getting top five repositories'),
      );
      expect(loggerErrorSpy).toHaveBeenCalled();
    });
  });
  describe('getRepositorieDetailsById #unit', () => {
    it('should return repository details by repository id', async () => {
      const repoId = faker.datatype.number();
      const githubRequesterMock: IGitHubRequester = {
        getRepositorieDetailsById: async (id: number): Promise<AxiosResponse> => {
          return {
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            data: { id },
          };
        },
        getTopRepositoryByLanguage: async (_language: string): Promise<AxiosResponse> => {
          return {
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            data: {},
          };
        },
      };
      const instance = new GitHubApiRepository(githubRequesterMock, loggerMock);
      const repositoryDetails = await instance.getRepositorieDetailsById(repoId);
      expect(repositoryDetails).toBeDefined();
      expect(repositoryDetails.id).toBe(repoId);
    });
    it('should throw not found error when requester return 404', async () => {
      const repoId = faker.datatype.number();
      const githubRequesterMock: IGitHubRequester = {
        getRepositorieDetailsById: async (_id: number): Promise<AxiosResponse> => {
          throw {
            response: { status: 404 },
          };
        },
        getTopRepositoryByLanguage: async (_language: string): Promise<AxiosResponse> => {
          return {
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            data: {},
          };
        },
      };
      const loggerErrorSpy = jest.spyOn(loggerMock, 'error');
      const instance = new GitHubApiRepository(githubRequesterMock, loggerMock);
      await expect(instance.getRepositorieDetailsById(repoId)).rejects.toThrow(
        new NotFoundError('Repository not found!'),
      );
      expect(loggerErrorSpy).toHaveBeenCalled();
    });
    it('should throw internal server error when a unexpected error happens', async () => {
      const repoId = faker.datatype.number();
      const githubRequesterMock: IGitHubRequester = {
        getRepositorieDetailsById: async (_id: number): Promise<AxiosResponse> => {
          throw {
            response: { status: 500 },
          };
        },
        getTopRepositoryByLanguage: async (_language: string): Promise<AxiosResponse> => {
          return {
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            data: {},
          };
        },
      };
      const loggerErrorSpy = jest.spyOn(loggerMock, 'error');
      const instance = new GitHubApiRepository(githubRequesterMock, loggerMock);
      await expect(instance.getRepositorieDetailsById(repoId)).rejects.toThrow(
        new InternalServerError('Error when getting repository details'),
      );
      expect(loggerErrorSpy).toHaveBeenCalled();
    });
  });
});
