import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

let ratelimit = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  try {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "20 s"), // 10 requests per 20 seconds
      analytics: true,
    });
    console.log("✅ Rate limiter initialized with Upstash");
  } catch (error) {
    console.error("❌ Failed to initialize rate limiter:", error.message);
  }
} else {
  console.log("⚠️  Upstash credentials not found - rate limiting disabled");
}

export default ratelimit;
