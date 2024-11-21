import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { ValidationError } from "yup";

export const expressErrorHandler: ErrorRequestHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(error);

  let statusCode = 500;
  let _response: any = {
    message: error.message,
  };

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    Object.assign(_response, error.response || {});
  } else if (error instanceof ValidationError) {
    statusCode = 400;
    Object.assign(_response, error);
  }

  response.status(statusCode).json(_response);
};
