import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ErrorMap {
  [key: string]: number;
}
const errorMap: ErrorMap = {
  badRequest: StatusCodes.BAD_REQUEST,
  unauthorized: StatusCodes.UNAUTHORIZED,
  notFound: StatusCodes.NOT_FOUND,
  unprocessableEntity: StatusCodes.UNPROCESSABLE_ENTITY,
  internal: StatusCodes.INTERNAL_SERVER_ERROR,
};

class HandlerError {
  private status: number | undefined;

  public handle(
    err: Error,
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    this.status = errorMap[err.name];

    if (!this.status) return next(err);

    res.status(this.status).json({ error: err.message });
  }
}

export default HandlerError;
