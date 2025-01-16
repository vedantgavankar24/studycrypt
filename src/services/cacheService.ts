import redis from "redis";
import { promisify } from "util";

const redisClient = redis.createClient();

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

export const setCache = async (key: string, value: any, ttl: number) => {
  await setAsync(key, JSON.stringify(value), "EX", ttl);
};

export const getCache = async (key: string) => {
  const data = await getAsync(key);
  return data ? JSON.parse(data) : null;
};
