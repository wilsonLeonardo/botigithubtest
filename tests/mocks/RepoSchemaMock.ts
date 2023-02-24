import { IRepo } from '../../src/domain/schema/Repos';

export const programmingLanguages = ['a', 'b', 'c', 'd', 'e'];

export const repoMock = programmingLanguages.map((pl) => {
  return { full_name: 'x', language: pl, stargazers_count: 5 } as IRepo;
});
