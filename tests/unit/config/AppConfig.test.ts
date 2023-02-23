import { faker } from '@faker-js/faker';
import { AppConfig, requiredEnvVar } from '../../../src/config/AppConfig';

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());

describe('AppConfig.ts', () => {
  describe('Smoke tests', () => {
    it('should exist #sanity', () => {
      expect(AppConfig).toBeDefined();
    });
    it('should be a object #sanity', () => {
      expect(AppConfig).toBeInstanceOf(Object);
    });
    it('requiredEnvVar should exist #sanity', () => {
      expect(requiredEnvVar).toBeDefined();
    });
    it('requiredEnvVar should be a function #sanity', () => {
      expect(requiredEnvVar).toBeInstanceOf(Function);
    });
  });

  describe('Unit tests', () => {
    const spyExit = jest.spyOn(process, 'exit').mockImplementation();
    afterEach(() => {
      consoleErrorSpy.mockClear();
      spyExit.mockClear();
    });

    it('should be error on console #unit', () => {
      requiredEnvVar(faker.random.word());
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(spyExit).toHaveBeenCalledWith(1);
    });

    it('should throw error when process.env for specific conf does not exist #unit', () => {
      jest.resetModules();
      process.env = { APP_ENVIRONMENT: 'test' };

      expect(process.env.APPLICATION_NAME).toBeUndefined();

      const AppConfigTest = require('../../../src/config/AppConfig');
      expect(AppConfigTest).toBeDefined();
      expect(AppConfigTest.AppConfig.APPLICATION_NAME).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(spyExit).toHaveBeenCalledWith(1);
    });

    it('should use "development" in app environment when it doesnt exists #unit', () => {
      jest.resetModules();
      delete process.env.APP_ENVIRONMENT;

      const AppConfigTest = require('../../../src/config/AppConfig');
      expect(AppConfigTest).toBeDefined();
      expect(AppConfigTest.AppConfig.APP_ENVIRONMENT).toBe('development');
    });
  });
});
