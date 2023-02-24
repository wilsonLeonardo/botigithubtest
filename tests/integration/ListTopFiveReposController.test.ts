import GitHubServiceFactory from '../../src/infrastructure/factories/service/GitHubServiceFactory';
import supertest from 'supertest';
import { OK } from 'http-status';
import { mockServer } from '../helpers';
import LoggerMock from '../mocks/LoggerMock';
import GitHubApiRepositoryMock from '../mocks/GitHubApiRepositoryMock';
import ReposRepositoryMock from '../mocks/ReposRepositoryMock';
import { repoMock } from '../mocks/RepoSchemaMock';

describe('ListTopFiveReposController', () => {
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
    reposRepositoryMock.listRepos = jest.fn().mockResolvedValueOnce(repoMock);

    return new Promise((done) => {
      server
        .get('/v1/repository/top-five')
        .expect(OK)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body.repositories).toStrictEqual(repoMock);
          done(undefined);
        });
    });
  });
});
