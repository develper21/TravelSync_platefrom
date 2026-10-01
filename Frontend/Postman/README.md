# TravelSync Frontend — Postman Collection

Frontend app jo API calls karta hai, wo sab is collection me flow-wise (user journey order me) organized hain.

## Import

1. Postman kholo → **Import** → `TravelSync-Frontend.postman_collection.json` select karo.

## Setup

1. Backend start karo:
   ```bash
   cd server
   npm run dev
   ```
2. (Optional) Frontend bhi start karo:
   ```bash
   cd Frontend
   npm run dev
   ```
3. **1. Auth Flow → Sign In** chalao — token auto-save ho jayega, baaki requests `{{token}}` use karengi.

## Base URL

`apiBaseUrl` = `http://localhost:5000/api` — bilkul wahi jo frontend ka `src/services/api.js` use karta hai. Deployed API pe test karna ho to is variable ko change kar do (e.g. `https://your-api.onrender.com/api`).

## Folder Order = User Journey

1. **Auth Flow** — signup/signin/OTP/logout (token yahin milta hai)
2. **Profile & Settings** — profile, preferences, payment methods, account delete
3. **Discover** — destinations, hotels, blogs (public pages, no token)
4. **Trip Planning** — dashboard stats, plan/edit/delete trips, PDF endpoint
5. **Bookings & Payments** — booking create → payment process → history
6. **Engagement** — reviews, comments, saved destinations, contact form

Upar se neeche chalte jao to poora frontend user-flow test ho jayega.

## Variables (auto-managed)

| Variable | Kaise set hota hai |
|---|---|
| `apiBaseUrl` | Manually (default `http://localhost:5000/api`) |
| `token`, `userId` | Sign In / Sign Up response se auto |
| `tripId` | Plan New Trip / Load My Trips se auto |
| `bookingId` | Create Booking se auto |
| `paymentId` | Create Payment se auto |
| `destinationId` | Browse Destinations se auto |
| `blogId` | Browse Blogs se auto |
| `hotelId` | Browse Hotels se auto |

## Runner se full flow test

Postman me collection → **Run** → pura collection order me chala do — signup se lekar contact form tak sab kuch auto-chained test ho jayega (token aur IDs automatically agle requests me use honge).

> Note: `Delete Account` aur `Delete Trip` jaise destructive requests runner me tabhi rakho jab fresh test data pe chala rahe ho.
