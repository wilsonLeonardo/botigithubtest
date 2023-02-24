import { ILogger } from '../../logger/ILogger';
import CreateTopFiveReposController from '../../../application/v1/controller/CreateTopFiveReposController';
import LoggerFactory from '../logger/LoggerFactory';
import IGitHubService from '@service/IGitHubService';

export default class CreateTopFiveReposControllerFactory {
  private static createTopFiveReposController: CreateTopFiveReposController;
  static async make(gitHubService: IGitHubService, logger?: ILogger): Promise<CreateTopFiveReposController> {
    if (!this.createTopFiveReposController) {
      this.createTopFiveReposController = new CreateTopFiveReposController(
        gitHubService,
        logger || LoggerFactory.make(),
      );
    }

    return this.createTopFiveReposController;
  }
}
