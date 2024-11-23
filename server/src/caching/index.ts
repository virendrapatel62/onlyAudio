import { REDIS } from "@/utils/env";
import { logger } from "@/utils/logger";
import Redis from "ioredis";

const redisClient = new Redis({
  host: REDIS.REDIS_HOST,
  password: REDIS.REDIS_PASSWORD,
  port: REDIS.REDIS_PORT,
});

redisClient
  .on("connect", () => {
    logger.info("Redis connected ✅");
  })
  .on("error", (error) => {
    logger.error("Redis connection failed!", error);
  });

export { redisClient };
