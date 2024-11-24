import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/express";
import { ApiError } from "../utils/api-error";
import { handler } from "../utils/handler-utils";
import { verifyToken } from "../utils/jwt";

const authMiddleware: RequestHandler = handler(
  async (request: AuthenticatedRequest, _, next) => {
    const token = request.headers.authorization;
    const sendUnauthorized = () =>
      next(
        ApiError.unauthorized({
          message: "unauthorized",
        })
      );

    if (!token) return sendUnauthorized();

    const payload = verifyToken(token) as any;
    if (!payload) return sendUnauthorized();

    const userid = payload.userId;
    const user = {
      id: userid,
    };
    request.user = user;
    return next();
  }
);

export default authMiddleware;
