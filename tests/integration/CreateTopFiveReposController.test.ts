import GitHubServiceFactory from '.././../src/infrastructure/factories/service/GitHubServiceFactory';
import supertest from 'supertest';
import { BAD_REQUEST, CREATED } from 'http-status';
import { mockServer } from '../helpers';
import LoggerMock from '../mocks/LoggerMock';
import GitHubApiRepositoryMock from '../mocks/GitHubApiRepositoryMock';
import ReposRepositoryMock from '../mocks/ReposRepositoryMock';
import { repoMock } from '../mocks/RepoSchemaMock';
import { Languages } from '../../src/application/v1/schemas/createTopFiveRepoSchema';

describe('CreateTopFiveReposController', () => {
  let server: supertest.SuperTest<supertest.Test>;
  let githubRepositoryMock = new GitHubApiRepositoryMock();
  let reposRepositoryMock = new ReposRepositoryMock();
  let logger = new LoggerMock();

  beforeAll(async () => {
    server = await mockServer({
      gitHubService: await GitHubServiceFactory.make(reposRepositoryMock, githubRepositoryMock, logger),
    });
  });

  it('should return 201 CREATED #integration', async () => {
    githubRepositoryMock.getTopFiveRepositories = jest.fn().mockResolvedValueOnce(repoMock);
    reposRepositoryMock.cleanRepository = jest.fn();
    reposRepositoryMock.save = jest.fn().mockResolvedValue(repoMock[0]);
    const programmingLanguages = [...Object.values(Languages).slice(0, 5)];

    return new Promise((done) => {
      server
        .post('/v1/repository/top-five')
        .send({
          programmingLanguages,
        })
        .expect(CREATED)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body.repositories).toStrictEqual(programmingLanguages.map(() => repoMock[0]));
          done(undefined);
        });
    });
  });
  it('should return 400 when programmingLanguages contains less than 5 languages #integration', async () => {
    const programmingLanguages = [...Object.values(Languages).slice(0, 4)];

    return new Promise((done) => {
      server
        .post('/v1/repository/top-five')
        .send({
          programmingLanguages,
        })
        .expect(BAD_REQUEST)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body).toStrictEqual({ error: '"programmingLanguages" must contain 5 items' });
          done(undefined);
        });
    });
  });
  it('should return 400 when programmingLanguages contains more than 5 languages #integration', async () => {
    const programmingLanguages = [...Object.values(Languages).slice(0, 7)];

    return new Promise((done) => {
      server
        .post('/v1/repository/top-five')
        .send({
          programmingLanguages,
        })
        .expect(BAD_REQUEST)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body).toStrictEqual({ error: '"programmingLanguages" must contain 5 items' });
          done(undefined);
        });
    });
  });
  it('should return 400 when programmingLanguages has duplicated values #integration', async () => {
    const programmingLanguages = [...Object.values(Languages).slice(0, 4), Object.values(Languages)[0]];

    return new Promise((done) => {
      server
        .post('/v1/repository/top-five')
        .send({
          programmingLanguages,
        })
        .expect(BAD_REQUEST)
        .end((error, response) => {
          expect(error).toBeNull();
          expect(response.body).toStrictEqual({ error: '"programmingLanguages[4]" contains a duplicate value' });
          done(undefined);
        });
    });
  });
});
