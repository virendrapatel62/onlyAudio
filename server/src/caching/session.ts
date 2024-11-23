import { redisClient } from ".";

const sessionUserKey = (userid: string) => `session:user:${userid}`;

export function getCachedSessionUser(userid: string) {
  return redisClient
    .hgetall(sessionUserKey(userid))
    .then((user) => (Object.keys(user).length ? user : null));
}
export function cacheSessionUser(userid: string, user: any) {
  return redisClient.hset(sessionUserKey(userid), user);
}
