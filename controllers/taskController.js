// controllers/taskController.js

const fs = require('fs');
const path = require('path');

// Task function to log the task and write to a file
async function task(user_id) {
    const logMessage = `${user_id}-task completed at-${Date.now()}\n`;

    // Print to console
    console.log(logMessage);

    // Save log message to a file
    const logFilePath = path.join(__dirname, '../logs/task_logs.txt');
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        }
    });
}

module.exports = { task };
