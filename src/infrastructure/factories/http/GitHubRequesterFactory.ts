import { AppConfig } from '../../../config/AppConfig';
import IGitHubRequester from '@infrastructure/http/IGitHubRequester';
import GitHubRequester from '@infrastructure/http/GitHubRequester';

export default class GitHubRequesterFactory {
  private static requester: IGitHubRequester;
  static async make(): Promise<IGitHubRequester> {
    if (this.requester) {
      return this.requester;
    }
    this.requester = new GitHubRequester(AppConfig.GIT_HUB_BASE_URL);
    return this.requester;
  }
}
