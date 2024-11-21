import express from "express";

const pingRouter = express.Router();

pingRouter.all("/ping", (_, response) => {
  response.json("pong");
});

export { pingRouter };
