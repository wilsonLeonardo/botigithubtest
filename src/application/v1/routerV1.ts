/* eslint-disable max-len */
import { Router } from 'express';
import PingControllerFactory from '@infrastructure/factories/controller/PingControllerFactory';

const routerV1 = Router();

(async () => {
  routerV1.get('/ping', PingControllerFactory.make().execute);
})();

export default routerV1;
