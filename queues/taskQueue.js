// queues/taskQueue.js

const taskQueue = new Map(); // To store queued tasks for each user

function queueTask(user_id, taskFunction) {
    const userQueue = taskQueue.get(user_id) || [];
    userQueue.push(taskFunction); // Add the task to the queue
    taskQueue.set(user_id, userQueue);
}

function processQueuedTasks(user_id) {
    const userQueue = taskQueue.get(user_id);
    if (userQueue && userQueue.length > 0) {
        const nextTask = userQueue.shift(); // Get the next task from the queue
        nextTask(); // Execute the task
        taskQueue.set(user_id, userQueue);
    }
}

module.exports = { queueTask, processQueuedTasks };
