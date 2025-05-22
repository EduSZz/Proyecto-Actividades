# Activity App

## Overview
The Activity App is a full-stack web application that allows users to manage their activities. It features user account creation, login functionality, and a dashboard for listing activities. Users can create, update, and delete activities, providing a comprehensive tool for activity management.

## Project Structure
The project is divided into two main parts: the backend and the frontend.

### Backend
The backend is built using Node.js with Express and TypeScript. It uses SQLite as the database. The backend structure is as follows:

- **src/**
  - **controllers/**: Contains controllers for handling business logic.
    - `activityController.ts`: Manages CRUD operations for activities.
    - `userController.ts`: Manages user account operations.
  - **models/**: Defines the data structures.
    - `activity.ts`: Defines the Activity interface.
    - `user.ts`: Defines the User interface.
  - **routes/**: Defines the API routes.
    - `activityRoutes.ts`: Routes for activity-related operations.
    - `userRoutes.ts`: Routes for user-related operations.
  - **middleware/**: Contains middleware functions.
    - `auth.ts`: Middleware for user authentication.
  - **database/**: Manages database connections and initialization.
    - `sqlite.ts`: Functions for SQLite database management.
  - `app.ts`: Entry point of the backend application.
  - **types/**: Contains TypeScript types and interfaces.
    - `index.ts`: Exports types used throughout the application.

### Frontend
The frontend is built using Angular. It provides a user-friendly interface for interacting with the backend. The frontend structure is as follows:

- **src/**
  - **app/**
    - **components/**: Contains Angular components for different functionalities.
      - **dashboard/**: Displays the list of activities.
        - `dashboard.component.ts`
      - **login/**: Handles user login.
        - `login.component.ts`
      - **register/**: Handles user registration.
        - `register.component.ts`
      - **activity/**: Allows users to create and update activities.
        - `activity.component.ts`
    - **services/**: Contains services for API interactions.
      - `activity.service.ts`: Interacts with the backend for activity operations.
      - `auth.service.ts`: Manages user authentication.
    - `app.module.ts`: Main module of the Angular application.
  - `index.html`: Main HTML file for the Angular application.

## Features
- User account creation and login.
- Dashboard for listing activities.
- Create, update, and delete activities.
- User authentication for secure access to features.

## Setup Instructions
1. Clone the repository.
2. Navigate to the `backend` directory and install dependencies:
   ```
   cd backend
   npm install
   ```
3. Set up the SQLite database by running the initialization script.
4. Start the backend server:
   ```
   npm start
   ```
5. Navigate to the `frontend` directory and install dependencies:
   ```
   cd frontend
   npm install
   ```
6. Start the Angular application:
   ```
   ng serve
   ```
7. Open your browser and go to `http://localhost:4200` to access the application.

## Conclusion
The Activity App provides a robust platform for managing activities with a clean separation between the backend and frontend. It leverages modern technologies to deliver a seamless user experience.