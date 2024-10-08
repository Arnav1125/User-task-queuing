const fs = require('fs');
const path = require('path');

// In-memory storage for rate limiting
const userTasksPerSecond = {}; // { user_id: [timestamp1, timestamp2, ...] }
const userTasksPerMinute = {}; // { user_id: [timestamp1, timestamp2, ...] }
const taskQueue = {}; // { user_id: [queued_tasks] }

// Rate limits
const RATE_LIMIT_SECOND = 1; // 1 task per second
const RATE_LIMIT_MINUTE = 20; // 20 tasks per minute

async function task(user_id) {
    const now = Date.now();

    // Process per-second rate limit
    if (userTasksPerSecond[user_id] && userTasksPerSecond[user_id].length >= RATE_LIMIT_SECOND) {
        const firstTimestamp = userTasksPerSecond[user_id][0];
        if (now - firstTimestamp < 1000) {
            // Rate limit exceeded, queue the task
            if (!taskQueue[user_id]) taskQueue[user_id] = [];
            taskQueue[user_id].push({ user_id, timestamp: now });

            return { status: 'queued' };
        }
        // Remove expired timestamps
        userTasksPerSecond[user_id].shift();
    }

    // Process per-minute rate limit
    if (userTasksPerMinute[user_id] && userTasksPerMinute[user_id].length >= RATE_LIMIT_MINUTE) {
        const firstTimestamp = userTasksPerMinute[user_id][0];
        if (now - firstTimestamp < 60000) {
            // Rate limit exceeded, queue the task
            if (!taskQueue[user_id]) taskQueue[user_id] = [];
            taskQueue[user_id].push({ user_id, timestamp: now });

            return { status: 'queued' };
        }
        // Remove expired timestamps
        userTasksPerMinute[user_id].shift();
    }

    // Add current task timestamp to per-second and per-minute limits
    userTasksPerSecond[user_id] = (userTasksPerSecond[user_id] || []).concat(now);
    userTasksPerMinute[user_id] = (userTasksPerMinute[user_id] || []).concat(now);

    return { status: 'completed' };
}

module.exports = { task };
