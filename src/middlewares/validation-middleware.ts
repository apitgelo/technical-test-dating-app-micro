/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, RequestHandler } from "express";
import { validate, ValidationError } from "class-validator";
import { instanceToPlain, plainToInstance } from "class-transformer";
import HttpError from "../exceptions/http-error";

const convertString = (data: any): string => {
  const keys = Object.keys(data);
  return keys.reduce((res, key) => `${res}${res ? ", " : ""}${data[key]}`, "");
};

const getErrorMessage = (data: any, nowKey: string): string => {
  if (!(data instanceof Array) && !(data instanceof Object)) return "";
  const plainData = instanceToPlain(data);
  const keys = Object.keys(plainData);
  if (!keys.length) return "";
  if (nowKey == "constraints") return convertString(data);
  return keys.reduce((res, key) => {
    const errMsg = getErrorMessage(data[key], key);
    if (errMsg) return `${res}${res ? ", " : ""}${errMsg}`;
    else return res;
  }, "");
};

export const validationBodyMiddleware = (type: any, skipMissingProperties = false): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const classData = plainToInstance(type, req.body);
    validate(classData, {skipMissingProperties})
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          next(new HttpError(getErrorMessage(errors, ""), 422, "VALIDATIONERROR"));
        } else {
          next();
        }
      })
      .catch((error) => (next(error)));
  };
};
