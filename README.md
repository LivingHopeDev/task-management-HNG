# Task Management API

This project implements a RESTful API for a task management system. The API allows users to create, read, update, and delete (CRUD) tasks, manage authentication, and ensure scalability and error handling. Key features include secure authentication, robust error handling, and optimized database queries to handle a growing number of users and tasks efficiently.

## Table of Contents

- [Live url](#url)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Database Migrations](#database-migrations)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Live url

- Note: The database will be inactive in the next 30 days.
  `https://task-management-api-wmjx.onrender.com/api/v1`

## Features

- CRUD Operations: Users can create, read, update, and delete tasks. Tasks can have attributes like title, description, due date, status, priority, and more.
- User Authentication: Secure user registration and login using JWT (JSON Web Token). Only authenticated users can manage their tasks.
- Error Handling: The API provides meaningful error messages and appropriate status codes for invalid inputs, missing resources, and server issues.
- Scalability: The API includes pagination for task retrieval and database indexing for efficient lookups.
- Task Management: Tasks can be filtered by status, priority, and tags.
- Task Sharing: Enable users to share tasks with others using email addresses
- Security: Passwords are securely hashed, and JWT tokens are used for authenticating requests.

## Technology Stack

- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL
- **Hosting:** Render

## Project Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Yarn](https://yarnpkg.com/) (v1.x)
- [PostgreSQL](https://www.postgresql.org/) (Ensure the database is running and accessible)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LivingHopeDev/task-management-HNG.git
   cd task-management-HNG
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root of the project and configure the following environment variables:
Check `.env.example ` file

```env
PORT=yourPortNumber
NODE_ENV=development
AUTH_SECRET=yourSecretKey
AUTH_EXPIRY=7d
DATABASE_URL=postgresql://postgres:yourDbPassword@yourhost:yourDbport/dbName


```

### Running the Application

#### Start the development server

```
yarn run start:dev

```

#### Access the application

The server will start on the specified PORT in your .env file. If PORT is set to 8000, the application will be available at <http://localhost:8070>.

#### Database Migrations

```
yarn prisma migrate dev
```

### API Documentation

Visit the url below to view the documentation
`https://task-management-api-wmjx.onrender.com/api/docs`
`localhost:8070/api/docs`

### Contributing

Contributions are welcome!

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Key Points

- The `README.md` provides a comprehensive guide on setting up the project locally, including installation instructions, environment variable configuration, and starting the server.
- Since the API documentation is not yet available, it includes a placeholder indicating that it will be provided later.
- The setup instructions are tailored specifically for a Node.js and PostgreSQL environment using Yarn.

This `README.md` file should serve as a solid foundation for your project documentation. Let me know if you need any changes or additional information!
