# Task Management Application

This is a full-stack Task Management application built for a coding challenge. It allows users to register, log in, and manage their tasks (create, update, delete).
The application uses React with TypeScript for the frontend, Node.js with Express for the backend, and PostgreSQL as the database. JWT authentication is implemented to secure task operations.

---

## Features

- **User Registration & Login:**

  - New users can register with a unique username and password.
  - Passwords are hashed using bcrypt.
  - Registered users can log in and receive a JWT token.

- **Task Management (CRUD):**

  - Authenticated users can create, view, update, and delete tasks.
  - Tasks are associated with a specific user.
  - Protected endpoints ensure that only logged-in users can modify their tasks.

- **Security:**
  - JWT authentication protects sensitive routes.
  - Environment variables are used to manage secrets and configuration.

---

## Tech Stack

- **Frontend:** React, TypeScript, Axios, React Router v6
- **Backend:** Node.js, Express, bcrypt, jsonwebtoken, pg, cors
- **Database:** PostgreSQL

---

## Prerequisites

- Node.js (v14 or later recommended)
- npm (Which is installed when installing Node.js)
- PostgreSQL installed and running (locally) which I provide instructions below
- Git (for cloning the repository)

---

## Setup Instructions

### Backend Setup

#### 1. Clone the Repository

Open terminal or command prompt (running as Administrator) and enter the following within a directory that is not System32 (if windows):

```bash
git clone https://github.com/hans-jaeger/lumaa-spring-2025-swe.git
cd lumaa-spring-2025-swe
```

---

#### 2. Backend Setup

### a. Install Dependencies

Navigate to the backend directory and install the required packages:

```bash
#Note: Your current path should be the following for this to work: lumaa-spring-2025/
# Check with "pwd" to see your current path within terminal.
cd backend
npm install
```

Follow this guide to install PostgreSQL using default settings: [Installation Guide](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database?query=&page=1)

1. Once you have finished installing PostgreSQL, open psql application.
2. Run the following command to connect to your PostgreSQL server (using the superuser which is postgres):

```bash
psql -U postgres
CREATE DATABASE task_management
```

You can verify that the database is there by typing the following command:

```bash
# Note: this will display the databases you have
\l
```

### b. Create a file named ".env" file in the backend directory:

You can create the file by accessing your file explorer or finder. 

Execute the following command where you replace your_password with your actual password:

```ini
# Note: The your_username and your_password comes from the installation when from installing PostGreSQL. Usually the default username is postgres but check your account information.

DATABASE_URL=postgres://postgres:your_password@localhost:5432/task_management
JWT_SECRET= b3aTLYvZA48rKogmrDwaqiGs3Vz+qtjSuAK1NDdYnpM=
PORT=5001

```

### c. Database Migrations

Execute the following command in terminal or command prompt:

```bash
#Note: Your current path should be the following for this to work: lumaa-spring-2025/backend.
cd migrations
psql -U postgres -d task_management -f users.sql
psql -U postgres -d task_management -f tasks.sql

```

### d. Start the backend server

```bash
    npm run dev
```

Your backend should now be running on http://localhost:5001.

### 3. Setting up the frontend

### a. Install Frontend Dependencies

In a new terminal window, navigate to the frontend directory and install its dependencies:

```bash
#Note: Your current path should be the following for this to work: lumaa-spring-2025/backend/migrations.
cd ../../frontend
npm install
```

### b. Configure Enviroment Variables

Create a file named .env in the frontend directory with the following content:

```ini
REACT_APP_API_URL=http://localhost:5001
```

### c. Start the Frontend Server

Start the frontend application by running:

```bash
npm start
```

The React app will run on http://localhost:3000. If the app does not appear in your browser, copy the link and paste it into your url search bar. Once you have the app you will be able to test the functionalities

## Video |

[Video Demo](https://www.youtube.com/watch?v=lCFaQ71sDLY)
