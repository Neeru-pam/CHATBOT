# Real-Time Chat Application

A **full-stack, real-time chat application** built with the MERN stack and Socket.IO. Users can sign up, log in, find other users, and engage in real-time conversations. The application features a clean, responsive user interface and a robust backend for authentication and messaging.

**Live Demo:** [https://chatbot-1-v2p8.onrender.com/](https://chatbot-1-v2p8.onrender.com/)

---

## Features

- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens) and Bcrypt.js for password hashing.
- **Real-Time Messaging:** Instant message delivery and updates powered by Socket.IO.
- **User Management:** View a list of other registered users and start new conversations.
- **Conversation History:** Retrieve and display past messages for each conversation.
- **Responsive Design:** Modern UI built with Tailwind CSS, optimized for various devices.

---

## Technologies Used

### Backend
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Real-Time Communication:** Socket.IO
- **Authentication:** JSON Web Tokens (`jsonwebtoken`) and Bcrypt.js
- **Environment Variables:** `dotenv`

### Frontend
- **Library:** React.js
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **API Calls:** Axios
- **Real-Time Communication:** Socket.IO-Client

---

## Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm
- MongoDB Atlas account or a local MongoDB instance

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Neeru-pam/chat_application.git
cd chat-application
```

### 2. Backend SetUp

```bash
cd backend
npm install
```

Create a .env file in the backend directory:

```bash
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<A strong, random secret key for JWT>
PORT=8000
```

Start the backend server:

```bash
npm run dev
```
The backend will run at http://localhost:8000

### 3. Frontend SetUp

```bash
cd ../frontend
npm install
npm start
```

The frontend will run at http://localhost:3000

# API Endpoints

### User Routes (`/api/v1/user`)

| Method | Endpoint       | Description                           |
|--------|----------------|---------------------------------------|
| POST   | /register      | Register a new user                   |
| POST   | /login         | Authenticate a user and return JWT    |
| GET    | /              | Retrieve a list of all users          |
| GET    | /profile       | Fetch the profile of authenticated user |
| GET    | /:id           | Retrieve a single user profile by ID  |

### Message Routes (`/api/v1/message`)

| Method | Endpoint       | Description                               |
|--------|----------------|-------------------------------------------|
| POST   | /send/:id      | Send a new message to a specific user    |
| GET    | /:id           | Retrieve all messages in a conversation with a user |

