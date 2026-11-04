# MongoDB Login & Authentication System

A clean, full-stack Express.js and native MongoDB application for user login, credentials validation, registration, and session routing.

---

## Project Structure
```text
├── .gitignore
├── .env.example
├── README.md
├── package.json
├── db.js             # Reusable MongoDB client connection pool
├── seed.js           # Seeds default test users to MongoDB
├── server.js         # Express routing, validation & authentication logic
├── public/
│   └── css/
│       └── style.css # Clean modern responsive stylesheet
└── views/
    ├── login.ejs     # Login form with validation error handling
    ├── register.ejs  # Registration form for new users
    └── dashboard.ejs # Protected landing view after valid login
```

---

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file from the template:
```bash
cp .env.example .env
```
Ensure MongoDB is running locally on port `27017` (or provide your MongoDB Atlas URI in `.env`).

### 3. Seed Initial Demo Users
```bash
npm run seed
```
This populates MongoDB with initial test credentials:
- **Email:** `abdullajahan2@gmail.com`
- **Password:** `password123`

### 4. Run the Application
```bash
npm start
```
Visit `http://localhost:3000` in your browser.

---

## Git & GitHub Upload Steps
Once extracted:
```bash
git init
git add .
git commit -m "Initial commit: MongoDB login and validation system"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
