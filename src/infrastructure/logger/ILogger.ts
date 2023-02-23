export interface ILogger {
  log(level: LogLevel, message: string): void;

  info(message: string): void;

  error(message: string): void;

  critical(message: string): void;
}

export type LogLevel = 'emergency' | 'alert' | 'critical' | 'error' | 'warning' | 'notice' | 'info' | 'debug';
