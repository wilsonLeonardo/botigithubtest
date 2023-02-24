import { Request } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import GetRepoDetailsController from '../../../../src/application/v1/controller/GetRepoDetailsController';
import GitHubServiceMock from '../../../mocks/GitHubServiceMock';
import LoggerMock from '../../../mocks/LoggerMock';
import InternalServerError from '../../../../src/domain/exceptions/InternalServerError';

describe('GetRepoDetailsController', () => {
  const githubService = new GitHubServiceMock();
  const logger = new LoggerMock();
  it('should match the snapshot #unit', () => {
    const instance = new GetRepoDetailsController(githubService, logger);
    expect(instance).toMatchSnapshot();
  });
  it('should get repository details #unit', async () => {
    const detail = { xpto: 'xpto' };
    githubService.getRepoDetails = jest.fn().mockImplementation((): Promise<any> => {
      return Promise.resolve(detail);
    });
    const instance = new GetRepoDetailsController(githubService, logger);

    const req = { params: { repoId: 242 } } as unknown as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    await instance.execute(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalledWith(detail);
  });
  it('should return error code when service throws #unit', async () => {
    githubService.getRepoDetails = jest.fn().mockImplementation((): Promise<any> => {
      return Promise.reject(new InternalServerError('error message'));
    });
    const instance = new GetRepoDetailsController(githubService, logger);

    const req = { params: { repoId: 242 } } as unknown as Request;
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
