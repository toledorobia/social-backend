// use node-rate-limiter to limit the number of requests per second from a single IP address.
// and mongodb.

import { RateLimiterMongo } from "rate-limiter-flexible";
import mongoose from 'mongoose';
import { isString } from "lodash";


const rateLimiter = (req, key = null, points = 30, duration = 60) => {
  const limiter = new RateLimiterMongo({
    storeClient: mongoose.connection,
    points,
    duration,
  });

  if (isString(key)) {
    key = `${key}:${req.ip}`;
  }

  return limiter.consume(key, 1);
}

const rateLimiterHeaders = (res, rateLimiterRes) => {
  res.setHeader("Retry-After", rateLimiterRes.msBeforeNext / 1000);
  // res.setHeader("X-RateLimit-Limit", opts.points);
  // res.setHeader("X-RateLimit-Remaining", rateLimiterRes.remainingPoints);
  res.setHeader("X-RateLimit-Reset", new Date(Date.now() + rateLimiterRes.msBeforeNext));

};

export {
  rateLimiter,
  rateLimiterHeaders,
}