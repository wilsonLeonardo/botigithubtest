import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import NotFoundError from '../../../../src/domain/exceptions/NotFoundError';

describe('NotFoundError', () => {
  it('should new NotFound error #unit', () => {
    const message = faker.random.word();
    const notFoundError = new NotFoundError(message);
    expect(notFoundError.message).toEqual(message);
    expect(notFoundError.code).toEqual(httpStatus.NOT_FOUND);
  });
});
