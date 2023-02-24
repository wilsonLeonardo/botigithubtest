import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import InternalServerError from '../../../../src/domain/exceptions/InternalServerError';

describe('InternalServerError', () => {
  it('should new InternalServer error #unit', () => {
    const message = faker.random.word();
    const internalServerError = new InternalServerError(message);
    expect(internalServerError.message).toEqual(message);
    expect(internalServerError.code).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
  });
});
