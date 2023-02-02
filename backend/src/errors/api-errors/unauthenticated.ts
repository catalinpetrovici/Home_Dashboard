import CustomAPIError from './api-error';
import HttpStatusCode from '../../interfaces/types/http.model';

export default class Unauthenticated extends CustomAPIError {
  constructor(
    message: string,
    methodName = '',
    httpCode = HttpStatusCode.FORBIDDEN,
    isOperational = true
  ) {
    super(message, methodName, httpCode, isOperational);
  }
}
