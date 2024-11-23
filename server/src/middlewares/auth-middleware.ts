import { RequestHandler } from "express";
import { ApiError } from "../utils/api-error";
import { handler } from "../utils/handler-utils";
import { verifyToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../types/express";
import { User } from "@/models/user";
import { cacheSessionUser, getCachedSessionUser } from "@/caching/session";

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

    const user = await getCachedSessionUser(userid).then(async (user) => {
      if (!user) {
        const _user = await User.findById(userid);
        await cacheSessionUser(userid, _user?.toJSON());
        return _user;
      }
      return user;
    });
    request.user = user;

    return next();
  }
);

export default authMiddleware;
