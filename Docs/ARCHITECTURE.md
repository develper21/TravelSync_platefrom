# 🏛️ System Architecture

**TravelSync – Travel Planning & Booking Platform**

This document describes the overall system architecture, technology stack, folder structure, data flow, and key design decisions for the **TravelSync** application.

---

## 1. High-Level Architecture

TravelSync follows a full-stack client-server architecture using **React (Vite)** and **Node.js/Express** with **MongoDB**.

```
┌──────────────┐       HTTPS/JSON        ┌──────────────────┐       Mongoose        ┌──────────────────┐
│     User     │ ◄─────────────────────► │  React Frontend  │ ◄───────────────────► │  Node.js Backend │
│ (Web Browser)│      REST API calls     │   (Vite + SPA)   │   Axios + JWT token   │ (Express Server) │
└──────────────┘                         └──────────────────┘                       └────────┬─────────┘
                                                                                              │
                                                                     ┌────────────────────────┼────────────────────────┐
                                                                     ▼                        ▼                        ▼
                                                              ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
                                                              │   MongoDB    │        │    Firebase  │        │   Payment    │
                                                              │  (Database)  │        │     Auth     │        │   Gateway    │
                                                              └──────────────┘        └──────────────┘        └──────────────┘
```

---

## 2. Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend** | React 19 (Vite) | UI framework / SPA |
| **Language** | JavaScript (ESM) | Frontend & backend development |
| **Styling** | Tailwind CSS 4 | Modern and responsive UI |
| **Routing** | React Router v7 | Client-side navigation |
| **Maps** | Leaflet + React-Leaflet | Interactive destination maps |
| **Icons** | Lucide + React Icons | Consistent iconography |
| **Backend** | Node.js + Express | REST API and business logic |
| **Database** | MongoDB + Mongoose | Data persistence (models) |
| **Authentication** | Firebase Auth + JWT | User authentication and authorization |
| **2FA** | otplib + qrcode (TOTP) | Google Authenticator support |
| **Passwords** | bcryptjs | Secure password hashing |
| **Deployment** | Netlify (Frontend) | Hosting and deployment |
| **Version Control** | Git + GitHub | Source code management |

---

## 3. Folder Structure

The project follows a feature-based folder structure to keep the code organized and scalable.

```
TravelSync/
├── Frontend/                      # React (Vite) client application
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── App.jsx                # Root component with routes
│   │   ├── main.jsx               # App entry point
│   │   ├── pages/
│   │   │   ├── auth/              # SignIn, SignUp pages
│   │   │   ├── public/            # Home, About, Blog, Contact
│   │   │   ├── trips/             # Trip planning wizard (step1–step6)
│   │   │   ├── bookings/          # Explore, DestinationDetail
│   │   │   └── dashboard/         # Profile, Payment pages
│   │   ├── components/            # navbar, Header, Footer
│   │   │   ├── common/            # Loading, ProtectedRoute
│   │   │   └── ui/                # Button, Input, Card
│   │   ├── contexts/              # AuthContext (global auth state)
│   │   ├── services/              # api.js (Axios instance + JWT interceptor)
│   │   ├── Dashboard/             # User dashboard module
│   │   ├── Explore/               # Explore module
│   │   ├── Bookings/              # My bookings module
│   │   ├── TripHistory/           # Trip history module
│   │   ├── Blog/                  # Blog module
│   │   ├── Payment/               # Payment module
│   │   ├── PaymentMethods/        # Payment methods module
│   │   ├── ProfileSettings/       # Profile settings module
│   │   ├── SavedDestinations/     # Saved destinations module
│   │   ├── assets/styles/         # Global.css (Tailwind theme)
│   │   └── utils/                 # Utility helpers
│   ├── index.html                 # HTML template
│   ├── tailwind.config.js         # Tailwind configuration
│   └── netlify.toml               # Netlify deploy config
│
└── server/                        # Node.js + Express backend
    ├── src/
    │   ├── config/                # db.js (MongoDB), firebase.js
    │   ├── controllers/           # Request handlers (auth, trips, hotels…)
    │   ├── middlewares/           # requireAuth (JWT verification)
    │   ├── models/                # Mongoose schemas
    │   ├── routes/                # Express routers per domain
    │   └── utils/                 # Helper functions
    ├── server.js                  # Express app entry point
    ├── docker-compose.yml         # Container setup (frontend + backend)
    └── .env.example               # Environment variables template
```

---

## 4. Backend Modules & API Routes

The backend is organized into domain-wise modules. Each module has a route → controller → model flow.

| Module | Route File | Key Endpoints (prefix `/api`) |
| --- | --- | --- |
| Auth | `authRoutes.js` | Signup, login, TOTP setup/verify |
| Users | `usersRoutes.js` | Get/update profile |
| Trips | `tripsRoutes.js` | CRUD for trip itineraries |
| Destinations | `destinationsRoutes.js` | List & detail of destinations |
| Hotels | `hotelsRoutes.js` | Search & book hotels |
| Bookings | `bookingsRoutes.js` | Create/list/manage bookings |
| Payments | `paymentsRoutes.js` | Process & record payments |
| Blogs | `blogsRoutes.js` | Blog list & details |
| Contact | `contactRoutes.js` | Contact form submissions |

---

## 5. Data Models (MongoDB)

| Model | Purpose | Key Fields |
| --- | --- | --- |
| `User` | Registered users | name, email, password, totpSecret |
| `Trip` | Planned trip itineraries | user, destination, dates, steps |
| `Destination` | Travel destinations | name, location, description, images |
| `Hotel` | Eco-friendly hotels | name, destination, price, amenities |
| `Booking` | User bookings | user, hotel/destination, dates, status |
| `Payment` | Payment records | user, booking, amount, method, status |
| `Blog` | Travel blog posts | title, content, author, images |
| `ContactMessage` | Contact form entries | name, email, message |

---

## 6. Data Flow (Booking Example)

```
1. User selects a hotel in the React app
        │
        ▼
2. Frontend calls API with JWT →  Authorization: Bearer <token>
        │
        ▼
3. requireAuth middleware verifies the token
        │
        ▼
4. Bookings controller validates & saves the booking (Mongoose)
        │
        ▼
5. Payments controller records the payment
        │
        ▼
6. Response JSON returns to the frontend → UI updates
```

---

## 7. Key Design Decisions

- 🔹 **JWT in localStorage:** The Axios interceptor attaches `Authorization: Bearer <token>` to every request (see `services/api.js`).
- 🔹 **Feature-based frontend folders:** Each major feature (Explore, Bookings, Payment…) lives in its own top-level module for clear ownership.
- 🔹 **Domain-wise backend modules:** Route → Controller → Model separation keeps API logic testable.
- 🔹 **Firebase Auth + JWT combo:** Firebase handles identity, JWT secures API endpoints, TOTP adds a second factor.
- 🔹 **Netlify + Docker:** Frontend deploys via Netlify; backend supports docker-compose for local/self-hosted runs.
