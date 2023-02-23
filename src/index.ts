import AppFactory from '@infrastructure/factories/AppFactory';
import LoggerFactory from '@infrastructure/factories/logger/LoggerFactory';
import DatabaseFactory from '@infrastructure/factories/persistence/DatabaseFactory';
import routes from './application/routes';

(async () => {
  const logger = LoggerFactory.make();
  const database = await DatabaseFactory.make(logger);
  await database.connect();
  const app = await AppFactory.make(routes);
  await app.listen();
})();
