# Creators Platform

A professional full-stack MERN application for content creators to manage their posts. This project integrates authentication, authorization, CRUD operations with pagination, and centralized error handling.

## Features

- **Authentication**: JWT-based registration and login flows.
- **Persistent Sessions**: User authentication state preserved on page refresh.
- **Protected Routes**: Secure access to dashboard and content creation pages.
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for posts.
- **Pagination**: Scalable list viewing using limit and skip.
- **Error Handling**: Graceful full-stack error management with toast notifications.
- **Responsive Design**: Modern, clean UI built with React.

## Technology Stack

- **Frontend**: React, React Router, Context API, Axios, React-Toastify.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JSON Web Token (JWT).
- **Styling**: Vanilla CSS.

## Project Structure

```text
creators-platform/
├── client/           # React frontend
├── server/           # Express backend
├── .gitignore        # Root gitignore
└── README.md         # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB database (local or Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd creators-platform
```

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## Usage

1. Register a new account.
2. Login to access your personal dashboard.
3. Create new posts, view them with pagination, edit, or delete them as needed.
4. Logout to secure your session.
