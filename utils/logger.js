const fs = require('fs');
const path = require('path');

// Helper function to log task completion
function logTaskCompletion(user_id) {
    const timestamp = Date.now();
    const logMessage = `${user_id}-task completed at-${timestamp}\n`;

    const logFilePath = path.join(__dirname, '..', 'task_logs.txt');
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log(`Task for user ${user_id} logged at ${timestamp}`);
        }
    });
}

module.exports = { logTaskCompletion };
