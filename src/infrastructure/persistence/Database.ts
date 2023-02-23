import { connect, ConnectOptions } from 'mongoose';

import { ILogger } from '../logger/ILogger';
import { IDatabase } from './IDatabase';

export default class Database implements IDatabase {
  private uri: string;
  private options: ConnectOptions;
  private logger: ILogger;

  constructor(uri: string, options: ConnectOptions, logger: ILogger) {
    this.uri = uri;
    this.options = options;
    this.logger = logger;
  }

  async connect(): Promise<void> {
    try {
      const connectionMongoDb = await connect(this.uri, this.options);

      this.logger.info('Database connected');

      connectionMongoDb.connection.on('error', () => {
        this.logger.error('Error on database connection');
        throw new Error('Error on database connection');
      });

      connectionMongoDb.connection.on('disconnected', () => {
        this.logger.error('Database disconnected');
        throw new Error('Database disconnected');
      });
    } catch (error) {
      this.logger.error(`Fail to connect on database with error: ${error}. Connection name: ${this.options.appName}`);
      throw error;
    }
  }
}
