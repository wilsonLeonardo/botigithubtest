import PingController from '../../../application/v1/controller/PingController';

export default class PingControllerFactory {
  static make(): PingController {
    return new PingController();
  }
}
