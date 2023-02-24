import { faker } from '@faker-js/faker';

process.env = {
  ...process.env,
  APPLICATION_NAME: 'botigithubtest',
  APP_ENVIRONMENT: 'test',
  MONGO_URI: faker.internet.url(),
  MONGO_USER: faker.internet.userName(),
  MONGO_PASSWORD: faker.internet.password(),
  MONGO_DB_NAME: 'github',
  GIT_HUB_BASE_URL: faker.internet.url(),
};

export {};

// eslint-disable-next-line no-console
console.debug = jest.fn();
