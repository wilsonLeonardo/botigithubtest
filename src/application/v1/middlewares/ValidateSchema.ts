import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError, Schema } from 'joi';
import schemas from '../schemas';
import { BadRequestError, InternalServerError } from '@domain/exceptions';
import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';

export const validateSchema = (validator: string, requestObject: 'body' | 'params' | 'query') => {
  const SchemaValidations: { [key: string]: Schema } = schemas;

  return function (request: Request, response: Response, next: NextFunction) {
    try {
      if (!SchemaValidations.hasOwnProperty(validator)) {
        throw new Error();
      }
      Joi.assert(request[requestObject], SchemaValidations[validator]);
      return next();
    } catch (error) {
      let errorDetails = new InternalServerError('Fail to validate request');
      if (error instanceof ValidationError && error.isJoi) {
        errorDetails = new BadRequestError(error.details.map((detail: any) => detail.message).join(', '));
      }
      const errorInfo = buildErrorInfo(errorDetails);

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  };
};
