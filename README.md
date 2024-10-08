# User Task Queuing with Rate Limiting

## Overview
This project implements a **Node.js-based API** that handles user task requests with **rate limiting** and **task queueing**. The rate limit is set to:
- One task per second.
- A maximum of 20 tasks per minute for each user.

Tasks that exceed the rate limit are queued and processed accordingly. This solution ensures that requests are **not dropped** and tasks are processed in compliance with the defined rate limits.

## Technologies Used
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework to handle API requests.
- **File System (fs)**: Used to log task completion to a file.
- **In-memory Task Queue**: A simple queueing system to handle tasks beyond the rate limit.

## Features

### 1. **Rate Limiting**
   - One task per second per user ID.
   - A maximum of 20 tasks per minute per user ID.

### 2. **Task Queueing**
   - Requests that exceed the rate limit are queued and processed later.

### 3. **Task Logging**
   - Task completion logs are stored in a file (`task_logs.txt`) with the user ID and timestamp.

### 4. **Resilience**
   - The application does not drop any requests. All tasks are either processed immediately or queued for later processing.

## How to Run

### 1. Clone the repository:

```bash
git clone <repository-url>


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
