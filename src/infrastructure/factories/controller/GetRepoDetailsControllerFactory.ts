import { ILogger } from '../../logger/ILogger';
import GetRepoDetailsController from '../../../application/v1/controller/GetRepoDetailsController';
import LoggerFactory from '../logger/LoggerFactory';
import IGitHubService from '@service/IGitHubService';

export default class GetRepoDetailsControllerFactory {
  private static getRepoDetailsController: GetRepoDetailsController;
  static async make(gitHubService: IGitHubService, logger?: ILogger): Promise<GetRepoDetailsController> {
    if (!this.getRepoDetailsController) {
      this.getRepoDetailsController = new GetRepoDetailsController(gitHubService, logger || LoggerFactory.make());
    }

    return this.getRepoDetailsController;
  }
}
