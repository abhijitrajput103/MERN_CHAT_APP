# Chat App

## Project Description
This is a real-time chat application consisting of a backend API server and a frontend client. The backend is built with Node.js, Express, and MongoDB, providing RESTful APIs and real-time communication using Socket.io. The frontend is a React application built with Vite, styled with TailwindCSS, and uses Zustand for state management.

## Technologies Used
- Backend: Node.js, Express, MongoDB, Mongoose, Socket.io, JWT, Cloudinary, dotenv
- Frontend: React, Vite, TailwindCSS, Zustand, React Router, Axios, Socket.io-client
- Other: ESLint, Nodemon, DaisyUI

## Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB instance (local or cloud)

## Installation

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Backend
- To start the backend server in development mode with auto-reload:
  ```bash
  npm run dev
  ```
- To start the backend server in production mode:
  ```bash
  npm start
  ```

### Frontend
- To start the frontend development server:
  ```bash
  npm run dev
  ```
- To build the frontend for production:
  ```bash
  npm run build
  ```
- To preview the production build locally:
  ```bash
  npm run preview
  ```

## Project Structure

### Backend
- `src/index.js`: Entry point of the backend server
- `src/controllers/`: API route controllers
- `src/routes/`: Express route definitions
- `src/models/`: Mongoose models for MongoDB collections
- `src/middleware/`: Express middleware (e.g., authentication)
- `src/lib/`: Utility libraries (e.g., database connection, cloudinary config)
- `src/seeds/`: Seed data scripts
- `package.json`: Backend dependencies and scripts

### Frontend
- `src/`: React source code
  - `components/`: Reusable React components
  - `pages/`: Page components for routing
  - `store/`: Zustand state management stores
  - `lib/`: Utility libraries (e.g., axios instance)
  - `constants/`: Application constants
- `public/`: Static assets
- `package.json`: Frontend dependencies and scripts
- `vite.config.js`: Vite configuration

## Environment Variables

### Backend
Create a `.env` file in the `backend` directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend
No special environment variables are required by default.

## Seeding Data
To seed initial user data, run the seed script in the backend:
```bash
node src/seeds/user.seed.js
```

## Available Scripts

### Root (Project)
- `npm run build`: Installs dependencies for backend and frontend, then builds frontend
- `npm start`: Starts backend server

### Backend
- `npm run dev`: Starts backend with nodemon for development
- `npm start`: Starts backend server

### Frontend
- `npm run dev`: Starts frontend development server
- `npm run build`: Builds frontend for production
- `npm run preview`: Previews production build

## Contact
For any questions or issues, please contact the project maintainer.
