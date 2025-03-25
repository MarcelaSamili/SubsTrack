# SubsTrack
 Builded and Deploy my First Production-Ready API

# Tutorial
I learn this API with JavaScript Mastery.
So this repository contains the code corresponding to an in-depth tutorial available on our YouTube channel, JavaScript Mastery.

# Introduction
Build a production-ready Subscription Management System API that handles real users, real money, and real business logic.

Authenticate users using JWTs, connect a database, create models and schemas, and integrate it with ORMs. Structure the architecture of your API to ensure scalability and seamless communication with the frontend.

If you're getting started and need assistance or face any bugs, join our active Discord community with over 50k+ members. It's a place where people help each other out.

# Tech Stack
- Node.js
- Express.js
- MongoDB

# Features
Advanced Rate Limiting and Bot Protection: with Arcjet that helps you secure the whole app.

👉 Database Modeling: Models and relationships using MongoDB & Mongoose.

👉 JWT Authentication: User CRUD operations and subscription management.

👉 Global Error Handling: Input validation and middleware integration.

👉 Logging Mechanisms: For better debugging and monitoring.

👉 Email Reminders: Automating smart email reminders with workflows using Upstash.

# Quick Start

Follow these steps to set up the project locally on your machine.

Prerequisites
Make sure you have the following installed on your machine:

-Git
-Node.js
-npm (Node Package Manager)
Cloning the Repository :  [https://github.com/adrianhajdin/subscription-tracker-api.git
cd subscription-tracker-api](https://github.com/MarcelaSamili/SubsTrack)

# Installation

Install the project dependencies using npm:

npm install

Set Up Environment Variables

Create a new file named .env.local in the root of your project and add the following content:


PORT=5500
SERVER_URL="http://localhost:5000"


NODE_ENV=development


DB_URI=

JWT_SECRET=
JWT_EXPIRES_IN="1d"


ARCJET_KEY=
ARCJET_ENV="development"


QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

EMAIL_PASSWORD=

-> Running the Project: npm run dev

-Open http://localhost:5500 in your browser or any HTTP client to test the project.

# Links
Arcjet - https://launch.arcjet.com/4g2R2e4
Upstash - https://bit.ly/42ealiN


