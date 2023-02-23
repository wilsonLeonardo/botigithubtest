import AppFactory from '@infrastructure/factories/AppFactory';
import routes from './application/routes';

(async () => {
  const app = await AppFactory.make(routes);
  await app.listen();
})();
