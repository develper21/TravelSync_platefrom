# TravelSync Fullstack Application

## Overview
TravelSync is a fullstack application designed to help users plan their adventures, sync itineraries, and explore the world with friends. This project utilizes a React frontend and a Node.js backend, with MongoDB for data storage and Firebase for authentication.

## Features
- User authentication with email and password.
- Google authentication integration.
- One-time password (OTP) generation using Google Authenticator for enhanced security.
- Protected routes to ensure only authenticated users can access certain pages.
- Responsive design for a seamless user experience across devices.

## Project Structure
The project is organized into two main directories: `frontend` and `backend`.

### Frontend
- **`frontend/package.json`**: Configuration for the frontend application, including dependencies and scripts.
- **`frontend/public/index.html`**: Main HTML file serving as the entry point for the React app.
- **`frontend/src/main.jsx`**: Entry point for the React application, rendering the main `App` component.
- **`frontend/src/App.jsx`**: Main application component that sets up routes.
- **`frontend/src/pages/signup.jsx`**: Signup page component for user registration.
- **`frontend/src/pages/signin.jsx`**: Signin page component for user login.
- **`frontend/src/components/ProtectedRoute.jsx`**: Component that protects certain routes for authenticated users.
- **`frontend/src/services/authService.js`**: Functions for handling authentication logic.
- **`frontend/src/api/apiClient.js`**: API client for making requests to the backend.
- **`frontend/src/styles/globals.css`**: Global styles for the application.
- **`frontend/README.md`**: Documentation for the frontend application.

### Backend
- **`backend/package.json`**: Configuration for the backend application, including dependencies and scripts.
- **`backend/.env.example`**: Template for environment variables needed for the backend.
- **`backend/src/server.js`**: Entry point for the backend application, setting up the Express server.
- **`backend/src/config/db.js`**: Configuration for connecting to MongoDB.
- **`backend/src/config/firebase.js`**: Configuration for Firebase authentication.
- **`backend/src/controllers/authController.js`**: Functions for handling authentication-related requests.
- **`backend/src/routes/authRoutes.js`**: Routes for authentication-related endpoints.
- **`backend/src/models/User.js`**: User model for MongoDB.
- **`backend/src/middlewares/requireAuth.js`**: Middleware for protecting routes that require authentication.
- **`backend/src/services/totpService.js`**: Functions for generating and verifying OTPs.
- **`backend/src/services/firebaseService.js`**: Functions for interacting with Firebase authentication.
- **`backend/src/utils/validators.js`**: Validation functions for user input.
- **`backend/README.md`**: Documentation for the backend application.

### Root Directory
- **`docker-compose.yml`**: Defines services and configurations for running the application in Docker.
- **`.gitignore`**: Specifies files and directories to be ignored by Git.
- **`README.md`**: Documentation for the entire project.

## Getting Started
To get started with the TravelSync application, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd TravelSync-fullstack
   ```

2. Set up the backend:
   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file based on `.env.example` and configure your environment variables.
   - Start the backend server:
     ```
     npm start
     ```

3. Set up the frontend:
   - Navigate to the `frontend` directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the frontend application:
     ```
     npm start
     ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.