import { NextFunction, RequestHandler } from "express";

/**
 * @descripton
 * handler provides erorr handing and
 * created for the common code to be added in future
 */
export const handler = (handler: RequestHandler) => {
  const _handler: RequestHandler = async (request, response, next) => {
    try {
      await handler(request, response, next);
    } catch (error: any) {
      next(error);
    }
  };
  return _handler;
};
