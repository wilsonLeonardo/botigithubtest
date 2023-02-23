import { createLogger, LoggerOptions, Logger as WinstonLogger } from 'winston';
import { ILogger, LogLevel } from './ILogger';

export default class Logger implements ILogger {
  private logger: WinstonLogger;

  constructor(options: LoggerOptions) {
    this.logger = createLogger(options);
  }

  log(level: LogLevel, message: string): void {
    this.logger.log(level, message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  critical(message: string): void {
    this.logger.crit(message);
  }
}
