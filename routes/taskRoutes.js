// routes/taskRoutes.js

const express = require('express');
const { task } = require('../controllers/taskController');
const { isRateLimited } = require('../middlewares/rateLimiter');
const { queueTask, processQueuedTasks } = require('../queues/taskQueue');

const router = express.Router();

router.post('/task', (req, res) => {
    const { user_id } = req.body;

    if (isRateLimited(user_id)) {
        // If rate-limited, queue the task
        queueTask(user_id, () => task(user_id));
        return res.json({ message: `Task for user ${user_id} is queued due to rate limit` });
    } else {
        // If not rate-limited, process the task
        task(user_id);
        processQueuedTasks(user_id); // Process any queued tasks
        return res.json({ message: `Task for user ${user_id} completed` });
    }
});

module.exports = router;
