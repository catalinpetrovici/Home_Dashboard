import CustomAPIError from './api-error';
import HttpStatusCode from '../../interfaces/types/http.model';

export default class NotFound extends CustomAPIError {
  constructor(
    message: string,
    methodName = '',
    httpCode = HttpStatusCode.NOT_FOUND,
    isOperational = true
  ) {
    super(message, methodName, httpCode, isOperational);
  }
}
