import { Request } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import { IRepo } from '../../../../src/domain/schema/Repos';
import ListTopFiveReposController from '../../../../src/application/v1/controller/ListTopFiveReposController';
import GitHubServiceMock from '../../../mocks/GitHubServiceMock';
import LoggerMock from '../../../mocks/LoggerMock';
import InternalServerError from '../../../../src/domain/exceptions/InternalServerError';
import { repoMock } from '../../../mocks/RepoSchemaMock';

describe('ListTopFiveReposController', () => {
  const githubService = new GitHubServiceMock();
  const logger = new LoggerMock();
  it('should match the snapshot #unit', () => {
    const instance = new ListTopFiveReposController(githubService, logger);
    expect(instance).toMatchSnapshot();
  });
  it('should list repositories #unit', async () => {
    githubService.list = jest.fn().mockImplementation((): Promise<Array<IRepo>> => {
      return Promise.resolve(repoMock);
    });
    const instance = new ListTopFiveReposController(githubService, logger);

    const req = {} as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    await instance.execute(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalledWith({ repositories: repoMock });
  });
  it('should return error code when service throws #unit', async () => {
    githubService.list = jest.fn().mockImplementation((): Promise<Array<IRepo>> => {
      return Promise.reject(new InternalServerError('error message'));
    });
    const instance = new ListTopFiveReposController(githubService, logger);

    const req = {} as unknown as Request;
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
