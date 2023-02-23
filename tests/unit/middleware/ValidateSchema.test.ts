import { Request } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';

import { validateSchema } from '../../../src/application/v1/middlewares/ValidateSchema';

describe('validateSchema', () => {
  it('should not allow invalid validator schema #unit', () => {
    const req = { params: { id: '123' } } as unknown as Request;
    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    validateSchema('invalidSchema', 'params')(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ error: 'Fail to validate request' });
  });
});
