import HttpStatusCode from '../interfaces/types/http.model';

export class BaseError extends Error {
  public readonly log: string;
  public readonly methodName: string | undefined;
  public readonly httpCode: HttpStatusCode | number;
  public readonly isOperational: boolean;

  constructor(
    log: string,
    message: string | unknown = log,
    methodName?: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super(<string>message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.log = log;
    if (methodName) this.methodName = methodName;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
