import { ConnectOptions } from 'mongoose';

import { AppConfig } from '../../../config/AppConfig';
import { ILogger } from '../../logger/ILogger';
import Database from '../../persistence/Database';
import { IDatabase } from '../../persistence/IDatabase';

export default class DatabaseFactory {
  private static database: IDatabase;

  static async make(logger: ILogger) {
    if (this.database) {
      return this.database;
    }

    let options: ConnectOptions = {
      appName: AppConfig.APPLICATION_NAME,
      dbName: AppConfig.MONGO_DB_NAME,
      user: AppConfig.MONGO_USER,
      pass: AppConfig.MONGO_PASSWORD,
    };

    this.database = new Database(AppConfig.MONGO_URI, options, logger);

    return this.database;
  }
}
