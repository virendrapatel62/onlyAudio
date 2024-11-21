import express from "express";

const pingRouter = express.Router();

pingRouter.all("/ping", (request, response) => {
  response.json("pong");
});

export { pingRouter };
