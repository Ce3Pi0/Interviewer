import rateLimit from "express-rate-limit";
import { slowDown } from "express-slow-down";
import { HTTP_TOO_MANY_REQUESTS } from "../lib/httpError.js";

const LIMIT_PERIOD: number = 15 * 60 * 1000;
const MAX_SLOW_DOWN_REQUESTS: number = 1000;
const MAX_REQUESTS: number = 3000;

export const rateSlowDown = slowDown({
  windowMs: LIMIT_PERIOD,
  delayAfter: MAX_SLOW_DOWN_REQUESTS,
  delayMs: (hits) => hits * 100,
});

export const rateLimiter = rateLimit({
  windowMs: LIMIT_PERIOD,
  max: MAX_REQUESTS,
  statusCode: HTTP_TOO_MANY_REQUESTS.code,
  message: {
    message: HTTP_TOO_MANY_REQUESTS.message,
  },
});
