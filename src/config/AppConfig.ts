import { Envs } from './types';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env') && process.env.APP_ENVIRONMENT != 'test') {
  console.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}

export function requiredEnvVar(varName: string): string | never {
  console.error('\x1b[31m%s\x1b[0m', `??  Required environment variable "${varName}" is missing.`);
  process.exit(1);
}

export const AppConfig: Envs = {
  APPLICATION_NAME: process.env.APPLICATION_NAME || requiredEnvVar('APPLICATION_NAME'),
  APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || 'development',
  PORT: Number(process.env.APP_PORT || 3000),
};
