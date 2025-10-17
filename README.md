# TravelSync Platform

A modern, full-stack travel planning and booking platform built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Frontend
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Built with Tailwind CSS and custom components
- **Authentication**: JWT-based user authentication
- **Protected Routes**: Secure routing with authentication guards
- **Trip Planning**: Multi-step trip planning wizard
- **Hotel Booking**: Search and book eco-friendly hotels
- **Payment Integration**: Secure payment processing
- **Dashboard**: User dashboard with trip and booking management

### Backend
- **RESTful API**: Complete REST API with proper error handling
- **Authentication**: JWT-based authentication with Firebase integration
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Image upload support for hotels and trips
- **Payment Processing**: Integration ready for payment gateways
- **CORS Support**: Configured for frontend-backend communication

## 🏗️ Project Structure

### Frontend Structure
```
Frontend/
├── src/
│   ├── components/
│   │   ├── common/         # Reusable common components
│   │   ├── layout/         # Header, Footer, Layout components
│   │   └── ui/            # Button, Card, Input, etc.
│   ├── pages/
│   │   ├── auth/          # SignIn, SignUp pages
│   │   ├── dashboard/     # User dashboard
│   │   ├── public/        # Home, About, Contact pages
│   │   └── trips/         # Trip planning pages
│   ├── contexts/          # React contexts (Auth, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service functions
│   ├── utils/            # Utility functions
│   └── assets/           # Images, styles, etc.
├── public/               # Static assets
└── dist/                # Built application
```

### Backend Structure
```
server/
├── src/
│   ├── config/          # Database, Firebase config
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Authentication, validation
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   └── utils/          # Helper functions
├── .env.example        # Environment variables template
└── package.json        # Dependencies and scripts
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Frontend Setup

1. **Install dependencies:**
```bash
cd Frontend
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

### Backend Setup

1. **Install dependencies:**
```bash
cd server
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env file with your configuration
```

3. **Start MongoDB:**
```bash
mongod
```

4. **Start development server:**
```bash
npm start
# or for development with auto-restart
npm run dev
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/verify-otp` - OTP verification

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/profile` - Delete user account

### Trips
- `GET /api/trips` - Get user's trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/:id` - Get specific trip
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Bookings
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get specific booking
- `PUT /api/bookings/:id` - Update booking
- `POST /api/bookings/:id/cancel` - Cancel booking

### Hotels
- `GET /api/hotels` - Search hotels
- `GET /api/hotels/search` - Advanced hotel search
- `GET /api/hotels/:id` - Get hotel details
- `GET /api/hotels/eco-friendly` - Get eco-friendly hotels

### Payments
- `GET /api/payments` - Get user's payments
- `POST /api/payments` - Create new payment
- `GET /api/payments/:id` - Get payment details

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Sign Up**: Create account and receive JWT token
2. **Sign In**: Login and receive JWT token
3. **Protected Routes**: Include token in Authorization header
4. **Token Verification**: Server verifies token on protected routes

## 💳 Payment Integration

Payment processing is integrated with:
- Credit/Debit Cards
- PayPal
- Bank transfers
- Digital wallets

## 🌱 Sustainability Features

- **Eco-friendly Hotels**: Filter and search for sustainable accommodations
- **Carbon Footprint**: Trip planning with environmental impact
- **Local Experiences**: Connect with local communities
- **Green Transportation**: Suggest eco-friendly travel options

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend Deployment (Heroku/Railway)
```bash
npm start
# Set environment variables in deployment platform
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🔄 Development Workflow

1. **Feature Branch**: Create feature branch from main
2. **Development**: Make changes and test locally
3. **Pull Request**: Submit PR with description
4. **Code Review**: Review and approve changes
5. **Merge**: Merge to main branch
6. **Deploy**: Deploy to production

## 🧪 Testing

```bash
# Frontend tests (when implemented)
npm run test

# Backend tests (when implemented)
npm run test
```

## 📚 Documentation

- **API Documentation**: Available at `/api/docs` when server is running
- **Component Documentation**: Inline comments in component files
- **Deployment Guide**: See deployment section above

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if necessary
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for sustainable travel** 🌍✈️