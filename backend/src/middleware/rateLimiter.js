import ratelimit from "../config/upstash.js";

export default async function rateLimiter(req, res, next) {
  try {
    if (!ratelimit) {
      return next(); // Skip rate limiting if not configured
    }

    // Get client IP
    const ip = req.ip || req.connection.remoteAddress || "unknown";

    // Apply rate limit per IP
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.error("Error in rate limiter middleware:", error);
    next(); // Continue even if rate limiter fails
  }
}
