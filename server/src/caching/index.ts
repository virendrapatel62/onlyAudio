import { createClient } from "redis";

const redisClient = createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect()
  .then((response) => {
    console.log(response);
  });

export { redisClient };
