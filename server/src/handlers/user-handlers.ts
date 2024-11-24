import { Locals, RequestHandler } from "express";
import { User } from "../models/user";
import { handler } from "../utils/handler-utils";

import express from "express";
import { AuthenticatedRequest } from "../types/express";
import { ApiError } from "@/utils/api-error";

export const userRouter = express.Router();

/**
 * @route /api/users
 */
export const getUserHandler: RequestHandler = handler(
  async (request: AuthenticatedRequest, response, next) => {
    const username = request.query.username;

    const user = await User.findOne({
      $or: [
        {
          username,
        },
      ],
    });

    if (!user) return next(ApiError.notFound());

    response.json({ user });
  }
);

userRouter.get("/", getUserHandler);
