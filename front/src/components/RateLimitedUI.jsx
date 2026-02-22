import React from "react";

export const RateLimitedUI = () => {
  return (
    <div className="text-center py-12 border border-red-500 bg-red-100 rounded-lg">
      <h2 className="text-2xl font-bold text-primary">Rate Limited</h2>

      <p className="text-primary mt-2 ">
        You have exceeded the rate limit. Please try again later.
      </p>
    </div>
  );
};
