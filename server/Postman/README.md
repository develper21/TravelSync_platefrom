# TravelSync Backend — Postman Collection

Backend ke saare routes Postman me test karne ke liye ready collection.

## Import

1. Postman kholo → **Import** → `TravelSync-Backend.postman_collection.json` select karo.
2. Collection import hone ke baad seedha use kar sakte ho.

## Setup

1. Server start karo:
   ```bash
   cd server
   npm run dev
   ```
   Default port `5000`. Alag port ho to collection ke **Variables** tab me `baseUrl` update kar do.

2. **Auth → Sign In** request chalao — response se `token` aur `userId` collection variables me **auto-save** ho jayenge.

3. Bas! Saari protected requests `{{token}}` use karti hain — kuch aur karne ki zarurat nahi.

## Variables (auto-managed)

| Variable | Kaise set hota hai |
|---|---|
| `baseUrl` | Manually (default `http://localhost:5000`) |
| `token`, `userId` | Sign In / Sign Up response se auto |
| `tripId` | Create Trip / Get My Trips se auto |
| `bookingId` | Create Booking / Get My Bookings se auto |
| `paymentId` | Create Payment / Get My Payments se auto |
| `destinationId` | Get All Destinations / Create Destination se auto |
| `blogId` | Get All Blogs / Create Blog se auto |
| `hotelId` | Get All Hotels / Create Hotel se auto |
| `paymentMethodId` | Add Payment Method se auto |

## Folders

- **Health** — server status
- **Auth** — signup, signin, verify-otp (2FA), logout, change password (+ `/register`, `/login` aliases)
- **Users** — profile, preferences, saved destinations, payment methods
- **Trips** — CRUD + stats + `/api/trip/plan` (PDF planner endpoint)
- **Bookings** — CRUD + stats + cancel
- **Hotels** — CRUD + search + eco-friendly (public GETs)
- **Destinations** — CRUD + review (public GETs)
- **Blogs** — CRUD + comment (public GETs)
- **Payments** — CRUD + process + webhook (no-auth)
- **Contact** — submit message (no-auth) + fetch messages

## Testing Order (recommended)

1. Health Check
2. Sign In → token save
3. Create Trip → `tripId` save
4. Create Booking → `bookingId` save
5. Create Payment → `paymentId` save
6. Baaki GET/PUT requests

## Notes

- JWT token 7 din valid rehta hai; expire ho jaye to dobara Sign In chalao.
- `Verify OTP` ke liye authenticator app se code lo — signup response me jo `qrCode` aata hai usse scan karke.
- Server dev mode me seed data bhi deta hai — pehle GET chala ke real IDs mil sakti hain.
