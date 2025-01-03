# Todo App
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/Lucasdota/todo_app_frontend2/blob/master/LICENSE)

A simple Todo application built with Next.js, React, TypeScript, and Tailwind CSS. This app allows users to register, log in with their email and password, and manage their todo items.

## Features

- User registration and authentication
- Create, read, update, and delete todo items
- Responsive design using Tailwind CSS
- TypeScript for type safety

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Lucasdota/todo-app-frontend.git
   cd todo-app
   ```
   
2. **Install the dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   
   ```bash
   DB_HOST=localhost
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=todolist_db
   ```

4. **Run the development server:**
   
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open your browser and navigate to http://localhost:3000.

### Usage

- **Registration**: Users can create an account by providing their email and password.
- **Login**: Users can log in with their registered email and password.
- **Todo Management**: Once logged in, users can create, view, update, and delete their todo items.

### Folder Structure

  ```bash
  /todo-app-frontend
  ├── /public         	   # Static assets
  ├── /src
    ├── /components        # Reusable components
    ├── /app               # Next.js pages and main component
    ├── middleware.js      # Middleware to protect paths
  ├── .env.local           # Environment variables
  ├── package.json         # Project metadata and dependencies
  ├── tailwind.config.ts   # Tailwind configuration
  └── tsconfig.json        # TypeScript configuration
  ```

### Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)
