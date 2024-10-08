﻿## User-task-queuing
## Overview
This project implements a Node.js-based API that handles user task requests with rate limiting and task queueing. The rate limit is set to one task per second and 20 tasks per minute for each user. Tasks exceeding the rate limit are queued and processed accordingly. This solution is designed to ensure that requests are not dropped, and that tasks are processed in compliance with the defined rate limits.
# # Technologies Used
Node.js: JavaScript runtime for the backend.
Express.js: Web framework to handle API requests.
File System (fs): Used to log task completion to a file.
In-memory Task Queue: Simple queueing system to handle tasks beyond the rate limit.
