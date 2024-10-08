// middlewares/rateLimiter.js

const rateLimit = new Map();

function isRateLimited(user_id) {
    const now = Date.now();
    const userData = rateLimit.get(user_id) || { lastTask: 0, taskCount: 0 };

    // Enforce 1 task per second
    if (now - userData.lastTask < 1000) {
        return true; // User is rate-limited (less than 1 second has passed)
    }

    // Reset if it's been more than 1 second
    userData.lastTask = now;
    rateLimit.set(user_id, userData);

    return false; // Not rate-limited
}

module.exports = { isRateLimited };
