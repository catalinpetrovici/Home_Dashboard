import CustomAPIError from './api-error';
import HttpStatusCode from '../../interfaces/types/http.model';

export default class Unauthorized extends CustomAPIError {
  constructor(
    message: string,
    methodName = '',
    httpCode = HttpStatusCode.UNAUTHORIZED,
    isOperational = true
  ) {
    super(message, methodName, httpCode, isOperational);
  }
}
