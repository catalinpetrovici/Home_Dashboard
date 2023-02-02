import { BaseError } from '../base-error';
import HttpStatusCode from '../../interfaces/types/http.model';

export default class DBError extends BaseError {
  constructor(
    message: string,
    methodName = '',
    httpCode = HttpStatusCode.BAD_REQUEST,
    isOperational = true
  ) {
    super('', message, methodName, httpCode, isOperational);
  }
}
