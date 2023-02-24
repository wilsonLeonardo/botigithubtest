import supertest from 'supertest';
import { CREATED, OK } from 'http-status';
import { API_URL_TEST_ENVIRONMENT } from './constants';
import { Languages } from '../../src/application/v1/schemas/createTopFiveRepoSchema';

const request = () => supertest(`${API_URL_TEST_ENVIRONMENT}`);

describe('API Flow #e2e', () => {
  let repositoriesIdCreated: Array<string> = [];
  it('should find and save repositories with success #e2e', async () => {
    const programmingLanguages = [...Object.values(Languages).slice(0, 5)];
    const response = await request().post('/repository/top-five').send({ programmingLanguages });
    expect(response.status).toBe(CREATED);
    expect(response.body.repositories).toHaveLength(5);
    repositoriesIdCreated = response.body.repositories.map((repo: { id: string }) => repo.id);
  });
  it('should list repositories with success #e2e', async () => {
    const response = await request().get('/repository/top-five');
    expect(response.status).toBe(OK);
    expect(response.body.repositories).toHaveLength(5);
    const retrievedRepositories = response.body.repositories.map((repo: { id: string }) => repo.id);
    expect(retrievedRepositories).toEqual(repositoriesIdCreated);
  });
  it('should get details of a repository with success #e2e', async () => {
    const response = await request().get(`/repository/${repositoriesIdCreated[0]}/details`);
    expect(response.status).toBe(OK);
    expect(response.body.id).toBe(repositoriesIdCreated[0]);
  });
});
