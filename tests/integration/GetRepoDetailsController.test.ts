import GitHubServiceFactory from '../../src/infrastructure/factories/service/GitHubServiceFactory';
import supertest from 'supertest';
import { BAD_REQUEST, NOT_FOUND, OK } from 'http-status';
import { mockServer } from '../helpers';
import LoggerMock from '../mocks/LoggerMock';
import GitHubApiRepositoryMock from '../mocks/GitHubApiRepositoryMock';
import ReposRepositoryMock from '../mocks/ReposRepositoryMock';
import { repoMock } from '../mocks/RepoSchemaMock';
import { faker } from '@faker-js/faker';

describe('GetRepoDetailsController', () => {
  let server: supertest.SuperTest<supertest.Test>;
  let githubRepositoryMock = new GitHubApiRepositoryMock();
  let reposRepositoryMock = new ReposRepositoryMock();
  let logger = new LoggerMock();

  beforeAll(async () => {
    server = await mockServer({
      gitHubService: await GitHubServiceFactory.make(reposRepositoryMock, githubRepositoryMock, logger),
    });
  });

  it('should return 200 OK #integration', async () => {
    reposRepositoryMock.getRepoById = jest.fn().mockResolvedValue(repoMock[0]);
    githubRepositoryMock.getRepositorieDetailsById = jest.fn().mockResolvedValueOnce(repoMock[0]);

    const repoId = faker.datatype.number();
    return new Promise((done) => {
      server
        .get(`/v1/repository/${repoId}/details`)
        .expect(OK)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body).toStrictEqual(repoMock[0]);
          done(undefined);
        });
    });
  });
  it('should return 404 NOT FOUND when repoId is not saved on database #integration', async () => {
    reposRepositoryMock.getRepoById = jest.fn().mockImplementation(() => {
      return Promise.resolve(null);
    });

    const repoId = faker.datatype.number();
    return new Promise((done) => {
      server
        .get(`/v1/repository/${repoId}/details`)
        .expect(NOT_FOUND)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body).toStrictEqual({ error: `Repository with id: ${repoId} is not saved!` });
          done(undefined);
        });
    });
  });
  it('should return 400 when repoId is not a number #integration', async () => {
    reposRepositoryMock.getRepoById = jest.fn().mockImplementation(() => {
      return Promise.resolve(null);
    });

    const repoId = 'eqod09K90';
    return new Promise((done) => {
      server
        .get(`/v1/repository/${repoId}/details`)
        .expect(BAD_REQUEST)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body).toStrictEqual({ error: `"repoId" must be a number` });
          done(undefined);
        });
    });
  });
});
