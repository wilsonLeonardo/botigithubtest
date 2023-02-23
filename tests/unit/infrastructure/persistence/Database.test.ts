import mongoose from 'mongoose';

import Database from '../../../../src/infrastructure/persistence/Database';
import LoggerMock from '../../../mocks/LoggerMock';
import { AppConfig } from '../../../../src/config/AppConfig';

const mockRes = {
  on: jest.fn(),
};

jest.mock('mongoose', () => ({
  connect: jest.fn().mockImplementation(
    (_uri: any, _options: any) =>
      ({
        connection: mockRes,
      } as any),
  ),
}));

describe('Database', () => {
  let database: Database;
  let loggerMock = new LoggerMock();

  const buildDatabase = () => {
    return new Database(
      AppConfig.MONGO_URI,
      {
        appName: AppConfig.APPLICATION_NAME,
        dbName: AppConfig.MONGO_DB_NAME,
        user: AppConfig.MONGO_USER,
        pass: AppConfig.MONGO_PASSWORD,
      },
      loggerMock,
    );
  };

  beforeEach(() => {
    database = buildDatabase();
    loggerMock.info = jest.fn();
    loggerMock.error = jest.fn();
    jest.clearAllMocks();
  });

  it('should build database #unit', async () => {
    expect(database).toBeInstanceOf(Database);
    expect(database).toHaveProperty('connect');
  });

  it('should connect to database #unit', async () => {
    const database = buildDatabase();
    const connectSpy = jest.spyOn(mongoose, 'connect');

    await database.connect();

    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(connectSpy).toHaveBeenCalled();
  });

  it('should catch a error event #unit', async () => {
    const database = buildDatabase();

    mockRes.on.mockImplementation((event, cb: any) => {
      if (event === 'error') {
        cb();
      }
    });
    await expect(database.connect()).rejects.toThrow(new Error('Error on database connection'));

    expect(mockRes.on).toHaveBeenCalledWith('error', expect.any(Function));
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledTimes(2);
  });

  it('should catch a disconnect event #unit', async () => {
    const database = buildDatabase();

    mockRes.on.mockImplementation((event, cb: any) => {
      if (event === 'disconnected') {
        cb();
      }
    });

    await expect(database.connect()).rejects.toThrow(new Error('Database disconnected'));

    expect(mockRes.on).toHaveBeenCalledWith('disconnected', expect.any(Function));
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledTimes(2);
  });

  it('should get an error to connect to database #unit', async () => {
    const database = buildDatabase();
    const databaseSpy = jest.spyOn(mongoose, 'connect').mockImplementation(() => {
      return Promise.reject(new Error('database fail'));
    });

    await expect(database.connect()).rejects.toThrow(new Error('database fail'));
    expect(loggerMock.error).toHaveBeenCalledWith(
      `Fail to connect on database with error: Error: database fail. Connection name: botigithubtest`,
    );
    expect(databaseSpy).toHaveBeenCalled();
  });
});
