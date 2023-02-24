const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  testMatch: ['**/tests/**/*.test.(ts|js|tsx)'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    './node_modules/',
    './docs/',
    './tests/',
    './dist/',
    './infra/',
    'src/index.ts',
    'src/infrastructure/factories',
    './development',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
