# 📘 Development Rules

**TravelSync – Project Guidelines for AI & Human Collaboration**

This document defines the development rules, coding standards, and best practices for the **TravelSync** application. These rules ensure consistency, maintainability, security, and quality across the codebase. Both AI assistants and human contributors must follow these guidelines.

---

## 1️⃣ General Principles

These rules apply to the entire project.

- ✅ Follow the project documentation ([PRD](PRD.md), [ARCHITECTURE](ARCHITECTURE.md), [DESIGN](DESIGN.md)) before making changes.
- ✅ Keep the code clean, readable, and well-structured.
- ✅ Prioritize simplicity and maintainability.
- ✅ Do not duplicate logic. Reuse existing components, utilities, or services.
- ✅ Make small, focused changes instead of large, risky edits.
- ✅ Do not modify unrelated files.
- ✅ Write self-explanatory code with meaningful variable and function names.

---

## 2️⃣ Technology & Coding Standards

Rules related to the tech stack and coding style.

| Area | Rule |
| --- | --- |
| 🟦 **Language** | Use modern JavaScript (ESM). Avoid `var` and unnecessary dependencies. |
| 🟦 **Framework** | Follow React 19 + Vite best practices (function components + hooks). |
| 🟦 **Styling** | Use Tailwind CSS and follow the design tokens in [DESIGN](DESIGN.md). |
| 🟦 **Backend** | Follow Express best practices: routes → controllers → models separation. |
| 🟦 **Linting** | Follow the ESLint config (`eslint.config.js`); fix all warnings before committing. |
| 🟦 **Formatting** | Keep consistent formatting and clear imports. |
| 🟦 **Dependencies** | Use stable, well-maintained packages only. Check bundle impact before adding new ones. |
| 🟦 **File Naming** | Components use PascalCase (`Button.jsx`); utilities use camelCase (`api.js`). |

---

## 3️⃣ Project Structure Rules

Follow the defined folder structure in [ARCHITECTURE](ARCHITECTURE.md) to keep the codebase organized.

- ✅ Reusable UI components go in `/components/ui`.
- ✅ Feature-specific code stays inside its feature module (`Explore/`, `Payment/`, etc.).
- ✅ Database and external service logic stays in the `server/src` layer only.
- ✅ API calls must go through `services/api.js` (Axios instance) — never call `axios` directly in components.
- ✅ Types of shared constants belong in `/utils` — do not scatter them across files.
- ✅ Do not create new folders without a clear reason documented in ARCHITECTURE.md.

---

## 4️⃣ Git & Version Control Rules

- ✅ Branch naming: `feature/…`, `fix/…`, `chore/…`.
- ✅ Commit messages must be clear and descriptive (present tense, imperative).
- ✅ Never commit `.env`, secrets, or API keys — use `.env.example` as a template.
- ✅ Pull small PRs; one logical change per PR.
- ✅ Do not push directly to `main`.

---

## 5️⃣ Security Rules

- ✅ Never store or log plain-text passwords — always hash with **bcryptjs**.
- ✅ All private API routes must pass through the `requireAuth` middleware.
- ✅ Validate and sanitize all user input on the backend.
- ✅ Keep JWT secrets, Firebase keys, and TOTP secrets in environment variables only.
- ✅ Use HTTPS in production and enable proper CORS (frontend origin only).

---

## 6️⃣ UI/UX Rules

- ✅ Follow the design system in [DESIGN](DESIGN.md) for colors, typography, and components.
- ✅ All pages must be fully responsive (mobile-first).
- ✅ Every async action needs loading and error states in the UI.
- ✅ Use `Loading.jsx` for spinners and reusable states.
- ✅ Keep navigation consistent — `Header`/`Footer` layout on public pages, navbar on app pages.

---

## 7️⃣ AI Assistant Rules

These rules apply specifically to AI assistants working on this project.

- ✅ Always read `docs` files ([PRD](PRD.md), [ARCHITECTURE](ARCHITECTURE.md), [RULES](RULES.md), [DESIGN](DESIGN.md)) before writing code.
- ✅ Update [TASKS](TASKS.md) status when starting/completing a task.
- ✅ Update [MEMORY](MEMORY.md) when project state changes (new phase, key decisions).
- ✅ Never invent features not listed in the [PRD](PRD.md) without discussion.
- ✅ Run lint/build checks before considering work complete.
- ✅ If a requirement is unclear, ask instead of guessing.

---

> 📌 **Note:** Violating these rules leads to inconsistent code and bugs. When in doubt, re-read [RULES](RULES.md) before writing code.
