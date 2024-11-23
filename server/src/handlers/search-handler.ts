import { RequestHandler } from "express";
import { User } from "../models/user";
import { handler } from "../utils/handler-utils";

import express from "express";

export const exploreRouter = express.Router();

/**
 * @route /api/explore/search
 */
export const searchHandler: RequestHandler = handler((request, response) => {
  const query = request.query.query;
  const serachFields = ["username", "firstName", "lastName"];

  User.find({
    $or: serachFields.map((field) => ({
      [field]: {
        $regex: query,
        $options: "i",
      },
    })),
  })
    .limit(20)
    .then((results) => {
      response.json({
        results,
      });
    });
});

exploreRouter.get("/search", searchHandler);
