import { faker } from '@faker-js/faker';
import GitHubRequester from '../../../../src/infrastructure/http/GitHubRequester';

const gitRequester = new GitHubRequester(faker.internet.url());

jest.mock('axios', () => {
  return jest.fn(async (request: { url?: string }) => {
    if (request.url && request.url.indexOf('throwError') > -1) {
      throw new Error('error message');
    }
    return {
      data: { ok: true },
    };
  });
});

describe('GitHubRequester', () => {
  it('should request sucessfully an existing repository', async () => {
    const response = await gitRequester.getTopRepositoryByLanguage('js');
    expect(response.data).toStrictEqual({ ok: true });
  });

  it('should throw an error when repository is invalid', async () => {
    await expect(gitRequester.getTopRepositoryByLanguage('throwError')).rejects.toThrow(new Error('error message'));
  });
});
