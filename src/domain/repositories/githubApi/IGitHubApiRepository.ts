export default interface IGitHubApiRepository {
  getTopFiveRepositories(languages: Array<string>): Promise<any>;
  getRepositorieDetailsById(id: number): Promise<any>;
}
