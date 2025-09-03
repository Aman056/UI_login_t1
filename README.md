# React Login & Sign-Up (Assignment)

A simple, responsive React application built with Create React App demonstrating routing, reusable components, state handling, input validation, and basic UX for Login and Sign-Up.

## Features

- React Router v6 for navigation (`/login`, `/signup`)
- Reusable `Input` and `Button` components
- Client-side validation with clear, per-field error messages
- Validation rules per assignment:
  - **Name**: alphabets and spaces only
  - **Username**: alphanumeric with limited special chars (`._@#-`, 3–30 chars)
  - **Password**: same character rules as username; must **not** equal username
  - **Confirm Password**: must match password
  - **Email**: must be a valid **@gmail.com** address (per "Same as Google email")
  - **Phone**: `+<country code> <number>`, digits only (e.g., `+91 9876543210`)
- After clicking **Sign up** on Login → navigates to Sign-up page
- After clicking **Sign Up** button → redirects back to Login
- Minimal demo persistence via `localStorage` (for assignment/demo only)
- Fully responsive layout with accessible focus states

## Quick Start

> Requires Node.js >= 16

```bash
# 1) Install dependencies
npm install

# 2) Start dev server
npm start

# 3) Build for production
npm run build
```

Then open http://localhost:3000 in your browser.

## Project Structure

```
react-auth-assignment/
├─ public/
│  └─ index.html
├─ src/
│  ├─ components/
│  │  ├─ Button.jsx
│  │  └─ Input.jsx
│  ├─ pages/
│  │  ├─ Login.jsx
│  │  └─ Signup.jsx
│  ├─ utils/
│  │  └─ validation.js
│  ├─ App.jsx
│  ├─ index.js
│  └─ styles.css
├─ package.json
└─ README.md
```

## Notes

- This is a learning/assignment project. Do **not** store plaintext passwords in production apps.
- If you want to accept non-Gmail emails instead, replace the regex in `validateEmail` with a general RFC5322-like pattern or a simpler one such as:
  ```js
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  ```
- Unit tests can be added using Jest + React Testing Library.

## Screenshots / Demo

Run locally with `npm start` and capture screenshots of the Login and Sign-Up screens for your submission. If you prefer a live demo, deploy to any static host (e.g., Netlify or Vercel).
