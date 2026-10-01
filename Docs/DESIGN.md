# 🎨 Design System

**TravelSync – Clean. Modern. Wanderlust-Ready.**

This document defines the visual design system, UI components, and user experience guidelines for **TravelSync**. The goal is to create a modern, minimal, and traveler-friendly interface with a consistent look and feel across the whole app.

---

## 1. Design Principles

| | | |
| --- | --- | --- |
| 🧭 **User-Centered** | 🍃 **Minimal & Clean** | 🎨 **Consistent** |
| *Simple and intuitive for all kinds of travelers.* | *Reduce clutter and focus on the journey content.* | *Follow a unified design system.* |

- 🧭 **User-Centered** — Simple and intuitive for all kinds of travelers.
- 🍃 **Minimal & Clean** — Reduce clutter and focus on the journey content.
- 🎨 **Consistent** — Follow a unified design system everywhere.

---

## 2. Color Palette

Primary colors used across the application (aligned with the existing `Button.jsx` variants):

| Swatch | Name | Hex | Usage |
| --- | --- | --- | --- |
| 🟦 | **Primary** | `#2563EB` (blue-600) | Main brand color — CTAs, links, active states |
| ⬜ | **Secondary** | `#4B5563` (gray-600) | Secondary actions, neutral buttons |
| 🟩 | **Success** | `#16A34A` (green-600) | Success messages, completed bookings |
| 🟧 | **Warning** | `#D97706` (amber-600) | Warnings, caution states |
| 🟥 | **Error** | `#DC2626` (red-600) | Error messages, validation alerts |
| ⬛ | **Text** | `#111827` (gray-900) | Primary text |
| ⬜ | **Background** | `#F9FAFB` (gray-50) | App background |
| 🎨 | **Accent** | `#F59E0B` (amber-500) | Highlights, badges, travel vibes |

> Tailwind utilities used in the app: `bg-blue-600 hover:bg-blue-700`, `text-gray-900`, `bg-gray-50`, `focus:ring-blue-500` — keep new components aligned with these tokens.

---

## 3. Typography

We use **Inter** as the primary font for a clean and modern look.

| | | |
| --- | --- | --- |
| **Aa** | **Inter** | *Clean, modern, and highly readable* |

| Element | Font | Weight | Size |
| --- | --- | --- | --- |
| Page Title | Inter | Bold (700) | 30px (text-3xl) |
| Section Heading | Inter | Semibold (600) | 20px (text-xl) |
| Body Text | Inter | Regular (400) | 16px (text-base) |
| Small / Caption | Inter | Regular (400) | 14px (text-sm) |

> Inter fallback stack: `'Inter', 'Roboto', sans-serif` (defined in `Global.css`).

---

## 4. UI Components

Standard components to be used throughout the app (existing in `/components/ui`).

### Buttons

| Variant | Style | Usage |
| --- | --- | --- |
| **Primary** | Blue filled (`bg-blue-600`) | Main actions — Book, Pay, Save |
| **Secondary** | Gray filled (`bg-gray-600`) | Supporting actions |
| **Success** | Green filled (`bg-green-600`) | Confirmations |
| **Danger** | Red filled (`bg-red-600`) | Delete, cancel booking |
| **Outline** | Blue border, transparent | Less prominent CTAs |
| **Ghost** | Text only, hover bg | Low-emphasis actions |

Sizes: `sm` (text-sm), `md` (text-base), `lg` (text-lg) — all with `rounded-lg` and loading-spinner support.

### Other Core Components

| Component | Location | Usage |
| --- | --- | --- |
| **Input** | `/components/ui/Input.jsx` | Forms with labels & validation states |
| **Card** | `/components/ui/Card.jsx` | Hotels, destinations, blog posts |
| **Header / Footer** | `/components/layout/` | Public page layout |
| **Navbar** | `/components/navbar.jsx` | In-app navigation |
| **ProtectedRoute** | `/components/common/` | Auth guard for private pages |
| **Loading** | `/components/common/Loading.jsx` | Spinner & async states |

---

## 5. Layout & Spacing

- 📐 **Spacing scale:** Tailwind defaults — `4px` base unit (`p-4`, `gap-4`, `mb-6` …).
- 📐 **Radii:** `rounded-lg` (8px) for buttons/cards/inputs; larger for feature cards.
- 📐 **Shadows:** Subtle (`shadow-sm` / `shadow-md`) — avoid heavy shadows.
- 📐 **Max width:** Content container centered with responsive gutters; mobile-first breakpoints.

---

## 6. Imagery & Icons

- 🖼️ **Photos:** Large, high-quality destination imagery on Explore/Detail pages.
- 🗺️ **Maps:** Leaflet maps styled minimal for destination views.
- 🔷 **Icons:** Lucide React + React Icons — consistent stroke icons only.

---

## 7. UX Guidelines

- ✅ Every async action (login, booking, payment) shows a **loading state**.
- ✅ Errors appear as **inline, friendly messages** — never raw browser alerts.
- ✅ Forms validate on submit and show field-level errors.
- ✅ Primary CTA is always visually dominant (one primary button per view).
- ✅ Empty states include an illustration/hint + action (e.g., "No trips yet — Plan one!").
- ✅ All interactions must work on mobile, tablet, and desktop.
