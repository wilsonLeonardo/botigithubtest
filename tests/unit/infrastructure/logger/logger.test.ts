import Logger from '../../../../src/infrastructure/logger/Logger';
import { config, transports } from 'winston';

describe('Logger', () => {
  jest.useFakeTimers();

  const logger = new Logger({
    levels: config.syslog.levels,
    transports: [new transports.Console()],
  });

  const winstonLogger = logger['logger'];
  let loggerSpy: ReturnType<typeof jest.spyOn>;

  it('should log each log level #unit', () => {
    loggerSpy = jest.spyOn(winstonLogger, 'log');
    logger.log('warning', 'log message');
    expect(loggerSpy).toHaveBeenCalled();

    loggerSpy = jest.spyOn(winstonLogger, 'info');
    logger.info('info message');
    expect(loggerSpy).toHaveBeenCalled();

    loggerSpy = jest.spyOn(winstonLogger, 'error');
    logger.error('error message');
    expect(loggerSpy).toHaveBeenCalled();

    loggerSpy = jest.spyOn(winstonLogger, 'crit');
    logger.critical('critical message');
    expect(loggerSpy).toHaveBeenCalled();
  });
});
