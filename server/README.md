# TravelSync Backend

This is the backend for the TravelSync application, which provides authentication and user management features using MongoDB, Firebase Authentication, and Google Authenticator for one-time password (OTP) generation.

## Features

- User registration and login
- Firebase authentication for secure user management
- One-time password (OTP) generation using Google Authenticator
- Protected routes to ensure only authenticated users can access certain resources

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Firebase
- Google Authenticator (TOTP)
- dotenv for environment variable management

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- Firebase project set up for authentication

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd TravelSync-fullstack/backend
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory based on the `.env.example` file and fill in the required environment variables:

   ```
   MONGODB_URI=<your_mongodb_uri>
   FIREBASE_API_KEY=<your_firebase_api_key>
   FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
   FIREBASE_PROJECT_ID=<your_firebase_project_id>
   FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
   FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
   FIREBASE_APP_ID=<your_firebase_app_id>
   ```

### Running the Application

1. Start the server:

   ```
   npm start
   ```

2. The server will run on `http://localhost:5000` (or the port specified in your environment variables).

### API Endpoints

- **POST /api/auth/signup**: Register a new user
- **POST /api/auth/signin**: Sign in an existing user
- **POST /api/auth/verify-otp**: Verify the OTP sent to the user

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.