# Postman Collection Guide

This guide will help you set up and test the Creator's Platform API using Postman.

## Setup

1. **Install Postman**: Download and install the Postman desktop app from [postman.com](https://www.postman.com/downloads/).
2. **Import Collection**:
   - In Postman, click the **Import** button in the top left.
   - Select the file: `docs/Creator-Platform-API.postman_collection.json`.
3. **Import Environment**:
   - Click the **Import** button again.
   - Select the file: `docs/Local-Development.postman_environment.json`.
4. **Select Environment**:
   - In the top right corner of Postman, click the environment dropdown (it might say "No Environment").
   - Select **Local Development**.

## Usage

1. **Start your server**: Ensure your backend server is running (e.g., `npm run dev`).
2. **Health Check**: Run the `Health Check` request in the `Health` folder to verify the server is reachable.
3. **Register User**:
   - Run the `Register User` request in the `Auth` folder.
   - This request uses a **Pre-request Script** to generate a unique email for every run.
   - A **Test script** automatically saves the returned JWT token to the `authToken` environment variable.
4. **Login User**:
   - If you already have an account, run the `Login User` request.
   - This will also automatically update the `authToken` variable.
5. **Authenticated Requests**:
   - All requests in the `Posts` folder are protected and automatically use the `{{authToken}}` variable in their Authorization header.
   - You can now run `Get All Posts`, `Create Post`, etc., without manually copying tokens.

## Request Organization

- **Health**: Server health check and connectivity.
- **Auth**: User registration and login flows (handles token management).
- **Posts**: Full CRUD operations for creator posts.

## Testing

Each request includes automated tests in the **Tests** tab. After sending a request, check the **Test Results** section in the response panel to see passing assertions for:
- HTTP Status Codes (200, 201, etc.)
- Response Body structure
- Performance (Response time < 500ms)

## Variables

- `{{baseURL}}`: The base URL of your API (defaults to `http://localhost:5000`).
- `{{authToken}}`: The JWT token used for authenticated requests (automatically updated on login/register).
