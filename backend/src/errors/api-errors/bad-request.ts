import CustomAPIError from './api-error';
import HttpStatusCode from '../../interfaces/types/http.model';

export default class BadRequest extends CustomAPIError {
  constructor(
    message: string,
    methodName = '',
    httpCode = HttpStatusCode.BAD_REQUEST,
    isOperational = true
  ) {
    super(message, methodName, httpCode, isOperational);
  }
}
