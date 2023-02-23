import { ILogger, LogLevel } from '../../src/infrastructure/logger/ILogger';

export default class LoggerMock implements ILogger {
  critical(message: string): void {
    this.log('critical', message);
  }

  error(message: string): void {
    this.log('error', message);
  }

  flush(): void {}

  info(message: string): void {
    this.log('info', message);
  }

  log(level: LogLevel, message: string): void {
    console.log(`${level.toString()}: ${message}`);
  }
}
