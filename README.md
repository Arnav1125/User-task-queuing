## User-task-queuing
## Overview
This project implements a Node.js-based API that handles user task requests with rate limiting and task queueing. The rate limit is set to one task per second and 20 tasks per minute for each user. Tasks exceeding the rate limit are queued and processed accordingly. This solution is designed to ensure that requests are not dropped, and that tasks are processed in compliance with the defined rate limits.
## Technologies Used
Node.js: JavaScript runtime for the backend.
Express.js: Web framework to handle API requests.
File System (fs): Used to log task completion to a file.
In-memory Task Queue: Simple queueing system to handle tasks beyond the rate limit.

## Features
# Rate Limiting:

1.One task per second per user ID.
2.A maximum of 20 tasks per minute per user ID.

# Task Queueing:

1.Requests that exceed the rate limit are queued and processed later.

# Task Logging:

1.Task completion logs are stored in a file (task_logs.txt) with the user ID and timestamp.

# Resilience:

1.The application does not drop any requests. All tasks are either processed immediately or queued for later processing.

## How to Run
Start the server:

node src/index.js
The server will run on port 3000. You can use any HTTP client (like Postman or cURL) to send POST requests to the /task endpoint

## API Endpoint
# POST /task
Body (JSON format):

{
  "user_id": "123"
}
