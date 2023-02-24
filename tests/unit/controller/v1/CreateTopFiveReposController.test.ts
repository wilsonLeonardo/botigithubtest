import { Request } from 'express';
import { CREATED, INTERNAL_SERVER_ERROR } from 'http-status';
import { IRepo } from '../../../../src/domain/schema/Repos';
import CreateTopFiveReposController from '../../../../src/application/v1/controller/CreateTopFiveReposController';
import GitHubServiceMock from '../../../mocks/GitHubServiceMock';
import LoggerMock from '../../../mocks/LoggerMock';
import InternalServerError from '../../../../src/domain/exceptions/InternalServerError';
import { repoMock, programmingLanguages } from '../../../mocks/RepoSchemaMock';

describe('CreateTopFiveReposController', () => {
  const githubService = new GitHubServiceMock();
  const logger = new LoggerMock();
  it('should match the snapshot #unit', () => {
    const instance = new CreateTopFiveReposController(githubService, logger);
    expect(instance).toMatchSnapshot();
  });
  it('should create repositories #unit', async () => {
    githubService.findAndSaveTopFiveRepos = jest.fn().mockImplementation((): Promise<Array<IRepo>> => {
      return Promise.resolve(repoMock);
    });
    const instance = new CreateTopFiveReposController(githubService, logger);

    const req = {
      body: {
        programmingLanguages,
      },
    } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    await instance.execute(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(CREATED);
    expect(mockJsonResponse).toHaveBeenCalledWith({ repositories: repoMock });
  });
  it('should return error code when service throws #unit', async () => {
    githubService.findAndSaveTopFiveRepos = jest.fn().mockImplementation((): Promise<Array<IRepo>> => {
      return Promise.reject(new InternalServerError('error message'));
    });
    const instance = new CreateTopFiveReposController(githubService, logger);

    const req = {
      body: {
        programmingLanguages: ['a'],
      },
    } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    await instance.execute(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
    expect(mockJsonResponse).toHaveBeenCalledWith({ error: 'error message' });
  });
});
