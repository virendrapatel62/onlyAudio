import { NextFunction, RequestHandler } from "express";

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
