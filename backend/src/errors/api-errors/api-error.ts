import HttpStatusCode from '../../interfaces/types/http.model';

import { BaseError } from '../base-error';

export default class CustomAPIError extends BaseError {
  constructor(
    message: string,
    methodName = '',
    httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super('', message, methodName, httpCode, isOperational);
  }
}
