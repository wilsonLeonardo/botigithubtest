import { ILogger } from '../../logger/ILogger';
import ListTopFiveReposController from '../../../application/v1/controller/ListTopFiveReposController';
import LoggerFactory from '../logger/LoggerFactory';
import IGitHubService from '@service/IGitHubService';

export default class ListTopFiveReposControllerFactory {
  private static listTopFiveReposController: ListTopFiveReposController;
  static async make(gitHubService: IGitHubService, logger?: ILogger): Promise<ListTopFiveReposController> {
    if (!this.listTopFiveReposController) {
      this.listTopFiveReposController = new ListTopFiveReposController(gitHubService, logger || LoggerFactory.make());
    }

    return this.listTopFiveReposController;
  }
}
