import Logger from '../../logger/Logger';
import { ILogger } from '../../logger/ILogger';
import { AppConfig } from '@config/AppConfig';
import { format as formatDate } from 'date-fns';
import { config } from 'winston';

const { format, transports } = require('winston');
const { combine, label, printf, colorize } = format;

export default class LoggerFactory {
  private static logger: ILogger;

  static make(): ILogger {
    if (this.logger) {
      return this.logger;
    }
    const date = formatDate(new Date(), 'MM/dd/yyyy h:mm a');

    const customFormat = printf(({ level, message, label }: { level: string; message: string; label: string }) => {
      return `${date} [${label}] ${level}: ${message}`;
    });
    this.logger = new Logger({
      levels: config.syslog.levels,
      format: combine(label({ label: AppConfig.APPLICATION_NAME }), colorize(), customFormat),
      transports: [new transports.Console()],
    });
    return this.logger;
  }
}
