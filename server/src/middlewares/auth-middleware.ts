import { RequestHandler } from "express";
import { ApiError } from "../utils/api-error";
import { handler } from "../utils/handler-utils";
import { verifyToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../types/express";

const authMiddleware: RequestHandler = handler(
  (request: AuthenticatedRequest, _, next) => {
    const token = request.headers.authorization;
    const sendUnauthorized = () =>
      next(
        ApiError.unauthorized({
          message: "unauthorized",
        })
      );

    if (!token) return sendUnauthorized();

    const payload = verifyToken(token);
    if (!payload) return sendUnauthorized();

    request.user = payload;
    return next();
  }
);

export default authMiddleware;
