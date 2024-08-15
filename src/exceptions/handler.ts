import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import HttpError from "./http-error";
import { APP_DEBUG } from "../config";

export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR);
  if (err instanceof HttpError) {
    res.status(err.getCode());
  }

  res.send({
    errors: {
      status: res.statusCode,
      code: err.name,
      message: err.message,
      trace: APP_DEBUG && res.statusCode != HttpStatus.NOT_FOUND ? err.stack : undefined
    }
  });
};

export const NotFoundHandler = (): void => {
  throw new HttpError("Invalid URL", HttpStatus.NOT_FOUND, "ERRNOTFOUND");
};
