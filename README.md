# WEB NOTE'S - Full Stack Notes Application

A complete full-stack note-taking web application that allows users to create, edit, organize, and manage notes with rich text formatting, folder organization, user authentication, and real-time search capabilities.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation Guide](#installation-guide)
7. [Backend Setup](#backend-setup)
8. [Frontend Setup](#frontend-setup)
9. [API Documentation](#api-documentation)
10. [Database Schema](#database-schema)
11. [Usage Guide](#usage-guide)
12. [Troubleshooting](#troubleshooting)
13. [License](#license)

---

## Overview

WEB NOTE'S is a modern note-taking application built with the MERN stack. It provides users with a secure platform to create, organize, and manage their notes. The application features user authentication, rich text editing, folder organization, pinning and favoriting capabilities, and persistent data storage using MongoDB. Each user has their own isolated workspace, ensuring complete data privacy and security.

---

## Features

### User Authentication and Security

- User registration with encrypted password storage
- Secure login using JSON Web Token authentication
- Token-based authorization for all protected API routes
- Password hashing using bcryptjs with 10 salt rounds
- 7-day token expiration for enhanced security
- Complete user data isolation between different accounts

### Note Management

- Create, read, update, and delete notes
- Rich text editing with custom toolbar
- Auto-resize text editor based on content length
- Real-time search by note title or content
- Export notes as PDF files
- Automatic save functionality

### Rich Text Editor Features

Text Formatting Options:
- Bold, Italic, and Underline formatting
- Text color selection with 8 predefined colors
- Text highlight with 8 predefined colors
- Custom color picker for both text and highlight
- Font size adjustment with 7 different sizes

Paragraph Formatting Options:
- Bulleted lists for unordered information
- Numbered lists for ordered information
- Multilevel lists for nested content
- Text alignment including Left, Center, Right, and Justify
- Heading styles H1 and H2
- Blockquote formatting for quoted content
- Hyperlink insertion

### Organization Features

Folder Management System:
- Create new custom folders
- Edit existing folder names
- Delete folders with automatic note reassignment
- View all notes inside a specific folder
- Move notes between different folders
- Display note count for each folder

Note Organization Options:
- Pin important notes to access them quickly
- Mark notes as favorites for easy reference
- Smart home page shows only regular notes
- Dedicated pages for pinned notes only
- Dedicated pages for favorite notes only

### User Experience Features

- Dark mode and Light mode theme toggle
- Responsive design that works on all devices
- User profile section with logout functionality
- Real-time search with instant filtering
- Loading states for all async operations
- Confirmation dialogs for delete operations
- Error handling with user-friendly messages

---

## Technology Stack

### Frontend Technologies

HTML5
- Semantic markup structure for better accessibility
- Contenteditable attribute for rich text editing
- Responsive meta tags for mobile devices

CSS3
- Tailwind CSS utility framework for styling
- CSS Grid and Flexbox for layouts
- Custom CSS animations for transitions
- Dark mode support with CSS variables
- Media queries for responsive design

JavaScript (ES6+)
- Modern JavaScript features including async/await
- Arrow functions and destructuring assignments
- Fetch API for backend communication
- LocalStorage for session and token management
- DOM manipulation for dynamic content updates
- Event handling for user interactions

External Libraries
- Tailwind CSS version 3.x for styling
- Google Fonts Inter for typography
- Google Material Symbols for icons

### Backend Technologies

Runtime and Framework
- Node.js version 18 or higher as JavaScript runtime
- Express.js version 5.x as web application framework

Database
- MongoDB version 6 or higher as NoSQL database
- Mongoose version 9.x as Object Data Modeling library

Authentication and Security
- JSON Web Token version 9.x for authentication
- bcryptjs version 3.x for password hashing
- CORS for cross-origin resource sharing
- dotenv version 17.x for environment variable management

Development Tools
- Nodemon version 3.x for automatic server restart during development

---

## Project Structure
web-notes/
│
├── backend/
│ ├── config/
│ │ └── db.js # MongoDB connection configuration
│ │
│ ├── controllers/
│ │ ├── authController.js # User authentication logic
│ │ ├── noteController.js # Note CRUD operations
│ │ └── folderController.js # Folder CRUD operations
│ │
│ ├── middleware/
│ │ └── authMiddleware.js # JWT token verification
│ │
│ ├── models/
│ │ ├── User.js # User schema definition
│ │ ├── Note.js # Note schema definition
│ │ └── Folder.js # Folder schema definition
│ │
│ ├── routes/
│ │ ├── authRoutes.js # Authentication endpoints
│ │ ├── noteRoutes.js # Note management endpoints
│ │ └── folderRoutes.js # Folder management endpoints
│ │
│ ├── .env # Environment variables
│ ├── package.json # Backend dependencies
│ └── server.js # Application entry point
│
├── frontend/
│ ├── add new/
│ │ ├── new.html # Create/Edit note page
│ │ ├── new.css # Page styles
│ │ └── new.js # Rich text editor logic
│ │
│ ├── Home page/
│ │ ├── Home.html # Main dashboard
│ │ ├── Home.css # Page styles
│ │ └── Home.js # Notes display and search
│ │
│ ├── login/
│ │ ├── login.html # Login page
│ │ ├── login.css # Page styles
│ │ └── login.js # Authentication logic
│ │
│ ├── create/
│ │ ├── create.html # Registration page
│ │ ├── create.css # Page styles
│ │ └── create.js # User registration logic
│ │
│ ├── Favorite page/
│ │ ├── favorite.html # Favorites display page
│ │ ├── favorite.css # Page styles
│ │ └── favorite.js # Favorites filtering logic
│ │
│ ├── pinned page/
│ │ ├── pinned.html # Pinned notes page
│ │ ├── pinned.css # Page styles
│ │ └── pinned.js # Pinned notes filtering logic
│ │
│ └── folder/
│ ├── folder.html # Folders management page
│ ├── folder.css # Page styles
│ └── folder.js # Folder CRUD operations
│
└── README.md # Project documentation
text


---

## Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:

1. Node.js (version 18 or higher)
   - Download from nodejs.org
   - Verify installation: `node --version`

2. MongoDB (version 6 or higher)
   - Local installation: Download from mongodb.com
   - Or use MongoDB Atlas cloud database
   - Verify installation: `mongod --version`

3. Git (optional, for cloning the repository)

### Step 1: Clone the Repository

Using Git:
```bash
git clone https://github.com/yourusername/web-notes.git
cd web-notes

Or download the ZIP file and extract it.
Step 2: Install Backend Dependencies

Navigate to the backend folder and install dependencies:
bash

cd backend
npm install

This will install the following packages:

    express (web framework)

    mongoose (MongoDB ODM)

    jsonwebtoken (JWT authentication)

    bcryptjs (password hashing)

    cors (cross-origin support)

    dotenv (environment variables)

    nodemon (development auto-restart)

Step 3: Configure Environment Variables

Create a .env file in the backend folder:
bash

touch .env

Open the .env file and add the following configuration:
env

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/notes_app
JWT_SECRET=your_super_secret_key_change_this_to_something_secure

Configuration Explanation:

    PORT: The port number for the backend server

    MONGO_URI: MongoDB connection string

        For local MongoDB: mongodb://127.0.0.1:27017/notes_app

        For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/notes_app

    JWT_SECRET: A strong secret key for JWT token generation

Step 4: Start MongoDB

For local MongoDB installation:

Windows:
bash

# Start MongoDB service
net start MongoDB

# Or run mongod from terminal
mongod

MacOS with Homebrew:
bash

brew services start mongodb-community

Linux:
bash

sudo systemctl start mongod

For MongoDB Atlas (cloud), no local setup is required.
Step 5: Start the Backend Server

From the backend folder:

Development mode (with auto-restart):
bash

npm run dev

Production mode:
bash

npm start

You should see:
text

Server is running on port 5000
MongoDB connected: 127.0.0.1

Step 6: Open the Frontend

The frontend is static HTML/CSS/JS. You can serve it using:

Option 1 - Live Server (Recommended):

    Install "Live Server" extension in VS Code

    Right-click on frontend/login/login.html

    Select "Open with Live Server"

Option 2 - Python HTTP Server:
bash

cd frontend
python -m http.server 5500

Option 3 - Node.js HTTP Server:
bash

npx serve frontend

Option 4 - Direct Open:

    Double-click frontend/login/login.html

    Note: Some features may not work due to CORS restrictions

The application will be available at: http://127.0.0.1:5500
Backend Setup
Environment Variables Reference
Variable	Description	Example
PORT	Server port number	5000
MONGO_URI	MongoDB connection string	mongodb://127.0.0.1:27017/notes_app
JWT_SECRET	Secret key for JWT signing	your_secure_secret_key_here
NPM Scripts

From the backend folder:
bash

npm run dev    # Start server with auto-restart (development)
npm start      # Start server without auto-restart (production)
npm install    # Install all dependencies

Database Collections

After running the application, MongoDB will create the following collections:

    users: Stores user account information

    notes: Stores user notes with references to users

    folders: Stores user folders with references to users

Frontend Setup
Page Navigation Structure

The application consists of the following pages:

    Login Page (login/login.html)

        Entry point of the application

        Users can login with existing credentials

    Create Account Page (create/create.html)

        New user registration

        Requires name, email, and password

    Home Page (Home page/Home.html)

        Main dashboard showing regular notes

        Contains search functionality

        Navigation sidebar with all sections

    Create/Edit Note Page (add new/new.html)

        Rich text editor for creating and editing notes

        Toolbar with all formatting options

        Options for pinning, favoriting, and folder assignment

    Favorites Page (Favorite page/favorite.html)

        Displays all notes marked as favorite

    Pinned Page (pinned page/pinned.html)

        Displays all notes marked as pinned

    Folders Page (folder/folder.html)

        Manage folders

        View notes by folder

API Documentation
Base URL
text

http://localhost:5000/api

Authentication Endpoints
Register New User

Request:
text

POST /auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}

Response (Success - 201):
json

{
    "message": "User registered successfully",
    "user": {
        "id": "60d5f9f4b8e5a8b6e8e4f4a1",
        "name": "John Doe",
        "email": "john@example.com"
    }
}

Response (Error - 400):
json

{
    "message": "User already exists"
}

Login User

Request:
text

POST /auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}

Response (Success - 200):
json

{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": "60d5f9f4b8e5a8b6e8e4f4a1",
        "name": "John Doe",
        "email": "john@example.com"
    }
}

Response (Error - 400):
json

{
    "message": "Invalid credentials"
}

Note Endpoints (Authentication Required)

All note endpoints require a Bearer token in the Authorization header:
text

Authorization: Bearer <your_jwt_token>

Get All Notes

Request:
text

GET /notes

Response (Success - 200):
json

[
    {
        "_id": "60d5f9f4b8e5a8b6e8e4f4a2",
        "title": "My First Note",
        "content": "<p>This is my note content</p>",
        "pinned": false,
        "favorite": false,
        "folder": "Work",
        "user": "60d5f9f4b8e5a8b6e8e4f4a1",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
    }
]

Get Single Note

Request:
text

GET /notes/:id

Response (Success - 200):
json

{
    "_id": "60d5f9f4b8e5a8b6e8e4f4a2",
    "title": "My First Note",
    "content": "<p>This is my note content</p>",
    "pinned": false,
    "favorite": false,
    "folder": "Work",
    "user": "60d5f9f4b8e5a8b6e8e4f4a1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
}

Response (Error - 404):
json

{
    "message": "Note not found"
}

Create Note

Request:
text

POST /notes
Content-Type: application/json

{
    "title": "New Note",
    "content": "<p>Note content with <strong>formatting</strong></p>",
    "pinned": false,
    "favorite": false,
    "folder": "Personal"
}

Response (Success - 201):
json

{
    "_id": "60d5f9f4b8e5a8b6e8e4f4a3",
    "title": "New Note",
    "content": "<p>Note content with <strong>formatting</strong></p>",
    "pinned": false,
    "favorite": false,
    "folder": "Personal",
    "user": "60d5f9f4b8e5a8b6e8e4f4a1",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
}

Update Note

Request:
text

PUT /notes/:id
Content-Type: application/json

{
    "title": "Updated Note Title",
    "content": "<p>Updated content</p>",
    "pinned": true,
    "favorite": false,
    "folder": "Work"
}

Response (Success - 200):
json

{
    "_id": "60d5f9f4b8e5a8b6e8e4f4a2",
    "title": "Updated Note Title",
    "content": "<p>Updated content</p>",
    "pinned": true,
    "favorite": false,
    "folder": "Work",
    "user": "60d5f9f4b8e5a8b6e8e4f4a1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z"
}

Delete Note

Request:
text

DELETE /notes/:id

Response (Success - 200):
json

{
    "message": "Note removed"
}

Folder Endpoints (Authentication Required)
Get All Folders

Request:
text

GET /folders

Response (Success - 200):
json

[
    {
        "_id": "60d5f9f4b8e5a8b6e8e4f4a4",
        "name": "Work",
        "user": "60d5f9f4b8e5a8b6e8e4f4a1",
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T10:00:00.000Z"
    },
    {
        "_id": "60d5f9f4b8e5a8b6e8e4f4a5",
        "name": "Personal",
        "user": "60d5f9f4b8e5a8b6e8e4f4a1",
        "createdAt": "2024-01-15T10:05:00.000Z",
        "updatedAt": "2024-01-15T10:05:00.000Z"
    }
]

Create Folder

Request:
text

POST /folders
Content-Type: application/json

{
    "name": "Study"
}

Response (Success - 201):
json

{
    "_id": "60d5f9f4b8e5a8b6e8e4f4a6",
    "name": "Study",
    "user": "60d5f9f4b8e5a8b6e8e4f4a1",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
}

Update Folder

Request:
text

PUT /folders/:id
Content-Type: application/json

{
    "name": "Academic"
}

Response (Success - 200):
json

{
    "_id": "60d5f9f4b8e5a8b6e8e4f4a6",
    "name": "Academic",
    "user": "60d5f9f4b8e5a8b6e8e4f4a1",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:30:00.000Z"
}

Delete Folder

Request:
text

DELETE /folders/:id

Response (Success - 200):
json

{
    "message": "Folder removed"
}

Database Schema
User Schema
javascript

{
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}

Timestamps are automatically added (createdAt, updatedAt).
Note Schema
javascript

{
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    pinned: {
        type: Boolean,
        default: false
    },
    favorite: {
        type: Boolean,
        default: false
    },
    folder: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}

Timestamps are automatically added (createdAt, updatedAt).
Folder Schema
javascript

{
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}

    Compound unique index: { name: 1, user: 1 }

    Timestamps are automatically added (createdAt, updatedAt)

Usage Guide
First Time Setup

    Open the application in your browser

    Click "Create Account" on the login page

    Fill in your name, email, and password

    Agree to the terms and submit

    You will be redirected to the login page

    Login with your new credentials

Creating a Note

    Click the "New Note" button in the sidebar

    Enter a title for your note

    Start typing content in the editor

    Use the toolbar to format your text:

okay so now give me all detail and all commands and everything about this application for put in README file in github in proper format without using icon's it look like human writable

Here is a complete, professional README file for your WEB NOTE'S application without any icons. Copy and paste this into your README.md file:
markdown

# WEB NOTE'S - Full Stack Notes Application

A complete full-stack note-taking web application that allows users to create, edit, organize, and manage notes with rich text formatting, folder organization, user authentication, and real-time search capabilities.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation Guide](#installation-guide)
7. [Backend Setup](#backend-setup)
8. [Frontend Setup](#frontend-setup)
9. [API Documentation](#api-documentation)
10. [Database Schema](#database-schema)
11. [Usage Guide](#usage-guide)
12. [Troubleshooting](#troubleshooting)
13. [License](#license)

---

## Overview

WEB NOTE'S is a modern note-taking application built with the MERN stack. It provides users with a secure platform to create, organize, and manage their notes. The application features user authentication, rich text editing, folder organization, pinning and favoriting capabilities, and persistent data storage using MongoDB. Each user has their own isolated workspace, ensuring complete data privacy and security.

---

## Features

### User Authentication and Security

- User registration with encrypted password storage
- Secure login using JSON Web Token authentication
- Token-based authorization for all protected API routes
- Password hashing using bcryptjs with 10 salt rounds
- 7-day token expiration for enhanced security
- Complete user data isolation between different accounts

### Note Management

- Create, read, update, and delete notes
- Rich text editing with custom toolbar
- Auto-resize text editor based on content length
- Real-time search by note title or content
- Export notes as PDF files
- Automatic save functionality

### Rich Text Editor Features

Text Formatting Options:
- Bold, Italic, and Underline formatting
- Text color selection with 8 predefined colors
- Text highlight with 8 predefined colors
- Custom color picker for both text and highlight
- Font size adjustment with 7 different sizes

Paragraph Formatting Options:
- Bulleted lists for unordered information
- Numbered lists for ordered information
- Multilevel lists for nested content
- Text alignment including Left, Center, Right, and Justify
- Heading styles H1 and H2
- Blockquote formatting for quoted content
- Hyperlink insertion

### Organization Features

Folder Management System:
- Create new custom folders
- Edit existing folder names
- Delete folders with automatic note reassignment
- View all notes inside a specific folder
- Move notes between different folders
- Display note count for each folder

Note Organization Options:
- Pin important notes to access them quickly
- Mark notes as favorites for easy reference
- Smart home page shows only regular notes
- Dedicated pages for pinned notes only
- Dedicated pages for favorite notes only

### User Experience Features

- Dark mode and Light mode theme toggle
- Responsive design that works on all devices
- User profile section with logout functionality
- Real-time search with instant filtering
- Loading states for all async operations
- Confirmation dialogs for delete operations
- Error handling with user-friendly messages

---

## Technology Stack

### Frontend Technologies

HTML5
- Semantic markup structure for better accessibility
- Contenteditable attribute for rich text editing
- Responsive meta tags for mobile devices

CSS3
- Tailwind CSS utility framework for styling
- CSS Grid and Flexbox for layouts
- Custom CSS animations for transitions
- Dark mode support with CSS variables
- Media queries for responsive design

JavaScript (ES6+)
- Modern JavaScript features including async/await
- Arrow functions and destructuring assignments
- Fetch API for backend communication
- LocalStorage for session and token management
- DOM manipulation for dynamic content updates
- Event handling for user interactions

External Libraries
- Tailwind CSS version 3.x for styling
- Google Fonts Inter for typography
- Google Material Symbols for icons

### Backend Technologies

Runtime and Framework
- Node.js version 18 or higher as JavaScript runtime
- Express.js version 5.x as web application framework

Database
- MongoDB version 6 or higher as NoSQL database
- Mongoose version 9.x as Object Data Modeling library

Authentication and Security
- JSON Web Token version 9.x for authentication
- bcryptjs version 3.x for password hashing
- CORS for cross-origin resource sharing
- dotenv version 17.x for environment variable management

Development Tools
- Nodemon version 3.x for automatic server restart during development

---

## Project Structure

web-notes/
│
├── backend/
│ ├── config/
│ │ └── db.js # MongoDB connection configuration
│ │
│ ├── controllers/
│ │ ├── authController.js # User authentication logic
│ │ ├── noteController.js # Note CRUD operations
│ │ └── folderController.js # Folder CRUD operations
│ │
│ ├── middleware/
│ │ └── authMiddleware.js # JWT token verification middleware
│ │
│ ├── models/
│ │ ├── User.js # User database schema
│ │ ├── Note.js # Note database schema
│ │ └── Folder.js # Folder database schema
│ │
│ ├── routes/
│ │ ├── authRoutes.js # Authentication API endpoints
│ │ ├── noteRoutes.js # Note management API endpoints
│ │ └── folderRoutes.js # Folder management API endpoints
│ │
│ ├── .env # Environment variables configuration
│ ├── package.json # Backend dependencies and scripts
│ └── server.js # Application entry point
│
├── frontend/
│ ├── add new/
│ │ ├── new.html # Create and edit note page
│ │ ├── new.css # Styles for note editor
│ │ └── new.js # Rich text editor logic
│ │
│ ├── Home page/
│ │ ├── Home.html # Main dashboard page
│ │ ├── Home.css # Styles for dashboard
│ │ └── Home.js # Notes display and search logic
│ │
│ ├── login/
│ │ ├── login.html # Login page
│ │ ├── login.css # Styles for login
│ │ └── login.js # Authentication logic
│ │
│ ├── create/
│ │ ├── create.html # Registration page
│ │ ├── create.css # Styles for registration
│ │ └── create.js # User registration logic
│ │
│ ├── Favorite page/
│ │ ├── favorite.html # Favorites display page
│ │ ├── favorite.css # Styles for favorites
│ │ └── favorite.js # Favorites filtering logic
│ │
│ ├── pinned page/
│ │ ├── pinned.html # Pinned notes page
│ │ ├── pinned.css # Styles for pinned notes
│ │ └── pinned.js # Pinned notes filtering logic
│ │
│ └── folder/
│ ├── folder.html # Folders management page
│ ├── folder.css # Styles for folders
│ └── folder.js # Folder CRUD operations
│
├── js/
│ └── api.js # API service functions
│
└── README.md # Project documentation
text


---

## Prerequisites

Before installing the application, ensure you have the following installed on your system:

1. Node.js version 18 or higher
   - Download from nodejs.org
   - Verify installation by running: node --version

2. MongoDB version 6 or higher
   - Download from mongodb.com for local installation
   - Or create a free MongoDB Atlas cloud account
   - Verify installation by running: mongod --version

3. Git (optional, for cloning the repository)
   - Download from git-scm.com

---

## Installation Guide

### Step 1: Get the Source Code

Option A - Clone using Git:
```bash
git clone https://github.com/yourusername/web-notes.git
cd web-notes

Option B - Download ZIP:

    Download the ZIP file from GitHub

    Extract it to your desired location

    Open terminal in the extracted folder

Step 2: Install Backend Dependencies

Navigate to the backend folder:
bash

cd backend

Install all required packages:
bash

npm install

This installs the following packages:

    express

    mongoose

    jsonwebtoken

    bcryptjs

    cors

    dotenv

    nodemon

Step 3: Configure Environment Variables

Create a .env file in the backend folder:
bash

touch .env

Open the .env file and add the following configuration:
env

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/notes_app
JWT_SECRET=your_super_secret_key_change_this_to_a_strong_key

Configuration Explanation:

    PORT - The port number where the backend server will run

    MONGO_URI - MongoDB connection string

        For local MongoDB: mongodb://127.0.0.1:27017/notes_app

        For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/notes_app

    JWT_SECRET - Secret key for generating JWT tokens (use a long random string)

Step 4: Start MongoDB

For local MongoDB installation:

Windows:
bash

net start MongoDB

or
bash

mongod

MacOS with Homebrew:
bash

brew services start mongodb-community

Linux:
bash

sudo systemctl start mongod

For MongoDB Atlas (cloud database), no local setup is required.
Step 5: Start the Backend Server

From the backend folder:

Development mode with auto-restart:
bash

npm run dev

Production mode:
bash

npm start

When the server starts successfully, you will see:
text

Server is running on port 5000
MongoDB connected: 127.0.0.1

Step 6: Open the Frontend

The frontend consists of static files. You can serve them using any of these methods:

Method 1 - VS Code Live Server (Recommended):

    Install the "Live Server" extension in VS Code

    Right-click on frontend/login/login.html

    Select "Open with Live Server"

Method 2 - Python HTTP Server:
bash

cd frontend
python -m http.server 5500

Method 3 - Node.js HTTP Server:
bash

npx serve frontend

Method 4 - Direct Open:

    Double-click frontend/login/login.html

    Note: Some features may not work due to CORS restrictions

The application will be available at: http://127.0.0.1:5500
Backend Setup
Environment Variables Reference
Variable	Description	Required	Example Value
PORT	Backend server port number	Yes	5000
MONGO_URI	MongoDB connection string	Yes	mongodb://127.0.0.1:27017/notes_app
JWT_SECRET	Secret key for JWT signing	Yes	your_secure_secret_key_here
NPM Scripts

From the backend folder:
Command	Description
npm run dev	Start server with nodemon (auto-restart on changes)
npm start	Start server without auto-restart (production mode)
npm install	Install all dependencies
Database Collections

After first run, MongoDB creates these collections:

    users - Stores user account information

    notes - Stores all notes with user references

    folders - Stores all folders with user references

Frontend Setup
Page Navigation Structure

The application contains seven main pages:

    Login Page (login/login.html)

        Entry point of the application

        Users authenticate with existing credentials

    Create Account Page (create/create.html)

        New user registration

        Required fields: name, email, password

        Terms acceptance required

    Home Page (Home page/Home.html)

        Main dashboard showing regular notes

        Search bar for filtering notes

        Sidebar navigation to all sections

        Profile section for user info and logout

    Create Note Page (add new/new.html)

        Rich text editor with formatting toolbar

        Title input field

        Note options sidebar for pin, favorite, folder

        Save, Delete, and PDF download buttons

    Edit Note Page (add new/new.html with ID)

        Same as create page but loads existing note

        Pre-filled with note content

    Favorites Page (Favorite page/favorite.html)

        Displays all notes marked as favorite

        Empty state message when no favorites

    Pinned Page (pinned page/pinned.html)

        Displays all notes marked as pinned

        Empty state message when no pinned notes

    Folders Page (folder/folder.html)

        Create, edit, and delete folders

        Click folder to view notes inside

        Back button to return to folders list

API Documentation
Base URL
text

http://localhost:5000/api

Authentication Endpoints
Register New User

Endpoint: POST /auth/register

Request Body:
json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}

Success Response (Status 201):
json

{
    "message": "User registered successfully",
    "user": {
        "id": "65a1b2c3d4e5f67890abcd12",
        "name": "John Doe",
        "email": "john@example.com"
    }
}

Error Response (Status 400):
json

{
    "message": "User already exists"
}

Login User

Endpoint: POST /auth/login

Request Body:
json

{
    "email": "john@example.com",
    "password": "password123"
}

Success Response (Status 200):
json

{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": "65a1b2c3d4e5f67890abcd12",
        "name": "John Doe",
        "email": "john@example.com"
    }
}

Error Response (Status 400):
json

{
    "message": "Invalid credentials"
}

Note Endpoints

All note endpoints require authentication. Include the JWT token in the Authorization header:
text

Authorization: Bearer your_jwt_token_here

Get All Notes

Endpoint: GET /notes

Success Response (Status 200):
json

[
    {
        "_id": "65a1b2c3d4e5f67890abcd13",
        "title": "Meeting Notes",
        "content": "<p>Important discussion points</p>",
        "pinned": false,
        "favorite": true,
        "folder": "Work",
        "user": "65a1b2c3d4e5f67890abcd12",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
    }
]

Get Single Note

Endpoint: GET /notes/:id

Success Response (Status 200):
json

{
    "_id": "65a1b2c3d4e5f67890abcd13",
    "title": "Meeting Notes",
    "content": "<p>Important discussion points</p>",
    "pinned": false,
    "favorite": true,
    "folder": "Work",
    "user": "65a1b2c3d4e5f67890abcd12",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
}

Error Response (Status 404):
json

{
    "message": "Note not found"
}

Create Note

Endpoint: POST /notes

Request Body:
json

{
    "title": "New Project Idea",
    "content": "<p>Launch a new <strong>product</strong> by Q3</p>",
    "pinned": false,
    "favorite": false,
    "folder": "Personal"
}

Success Response (Status 201):
json

{
    "_id": "65a1b2c3d4e5f67890abcd14",
    "title": "New Project Idea",
    "content": "<p>Launch a new <strong>product</strong> by Q3</p>",
    "pinned": false,
    "favorite": false,
    "folder": "Personal",
    "user": "65a1b2c3d4e5f67890abcd12",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
}

Update Note

Endpoint: PUT /notes/:id

Request Body (partial updates allowed):
json

{
    "title": "Updated Project Idea",
    "pinned": true,
    "favorite": true
}

Success Response (Status 200):
json

{
    "_id": "65a1b2c3d4e5f67890abcd14",
    "title": "Updated Project Idea",
    "content": "<p>Launch a new <strong>product</strong> by Q3</p>",
    "pinned": true,
    "favorite": true,
    "folder": "Personal",
    "user": "65a1b2c3d4e5f67890abcd12",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z"
}

Delete Note

Endpoint: DELETE /notes/:id

Success Response (Status 200):
json

{
    "message": "Note removed"
}

Folder Endpoints

All folder endpoints require authentication.
Get All Folders

Endpoint: GET /folders

Success Response (Status 200):
json

[
    {
        "_id": "65a1b2c3d4e5f67890abcd15",
        "name": "Work",
        "user": "65a1b2c3d4e5f67890abcd12",
        "createdAt": "2024-01-15T09:00:00.000Z",
        "updatedAt": "2024-01-15T09:00:00.000Z"
    },
    {
        "_id": "65a1b2c3d4e5f67890abcd16",
        "name": "Personal",
        "user": "65a1b2c3d4e5f67890abcd12",
        "createdAt": "2024-01-15T09:30:00.000Z",
        "updatedAt": "2024-01-15T09:30:00.000Z"
    }
]

Create Folder

Endpoint: POST /folders

Request Body:
json

{
    "name": "Study"
}

Success Response (Status 201):
json

{
    "_id": "65a1b2c3d4e5f67890abcd17",
    "name": "Study",
    "user": "65a1b2c3d4e5f67890abcd12",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
}

Error Response (Status 400):
json

{
    "message": "Folder already exists"
}

Update Folder

Endpoint: PUT /folders/:id

Request Body:
json

{
    "name": "Academic"
}

Success Response (Status 200):
json

{
    "_id": "65a1b2c3d4e5f67890abcd17",
    "name": "Academic",
    "user": "65a1b2c3d4e5f67890abcd12",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:30:00.000Z"
}

Delete Folder

Endpoint: DELETE /folders/:id

Success Response (Status 200):
json

{
    "message": "Folder removed"
}

Database Schema
User Schema

The User collection stores all registered user information.
Field	Type	Required	Description
name	String	Yes	User's full name
email	String	Yes	Unique email address (lowercase)
password	String	Yes	Hashed password using bcrypt
createdAt	Date	Auto	Timestamp of user creation
updatedAt	Date	Auto	Timestamp of last update

Indexes:

    Unique index on email field for fast lookup and uniqueness

Note Schema

The Note collection stores all user notes.
Field	Type	Required	Default	Description
title	String	Yes	-	Note title
content	String	Yes	-	HTML content of the note
pinned	Boolean	No	false	Whether note is pinned
favorite	Boolean	No	false	Whether note is favorited
folder	String	No	""	Folder name the note belongs to
user	ObjectId	Yes	-	Reference to User who owns the note
createdAt	Date	Auto	-	Timestamp of note creation
updatedAt	Date	Auto	-	Timestamp of last update

Indexes:

    Index on user field for fast user-specific queries

    Index on folder field for folder filtering

Folder Schema

The Folder collection stores folders created by users.
Field	Type	Required	Description
name	String	Yes	Folder name (trimmed)
user	ObjectId	Yes	Reference to User who owns the folder
createdAt	Date	Auto	Timestamp of folder creation
updatedAt	Date	Auto	Timestamp of last update

Indexes:

    Compound unique index on (name, user) to prevent duplicate folder names per user

    Index on user field for fast user-specific queries

Usage Guide
First Time User Setup

    Open the application in your web browser

    On the login page, click the "Create Account" link

    Fill in your full name, email address, and password

    Check the box to agree to the Terms of Service

    Click the "Create Account" button

    After successful registration, you will be redirected to the login page

    Enter your email and password to login

Creating a New Note

    From the Home page, click the "New Note" button in the sidebar

    Enter a title for your note in the title field

    Start typing your content in the rich text editor

    Use the toolbar buttons to format your text:

        Click B for bold text

        Click I for italic text

        Click U for underlined text

        Click the color button to change text color

        Click the highlight button to add background color

        Click the list buttons for bullet or numbered lists

        Click the alignment buttons to change text position

    Optionally, pin the note or mark it as favorite using the switches in the right sidebar

    Select a folder from the dropdown to organize the note

    Click the "Save" button to save your note

    You will be redirected to the Home page

Editing an Existing Note

    From the Home page, click on any note card

    The note will open in the editor with all content loaded

    Make your changes to the title or content

    Modify pin, favorite, or folder settings as needed

    Click the "Save" button to update the note

    Click the "Delete" button to remove the note (confirmation required)

Searching for Notes

    On the Home page, locate the search bar at the top

    Type any keyword to search in note titles and content

    The results will filter in real-time as you type

    Clear the search box to see all notes again

Organizing Notes with Folders

    Navigate to the Folders page using the sidebar link

    Click "New Folder" to create a folder

    Enter a name for the folder and confirm

    To edit a folder name, hover over the folder and click the edit button

    To delete a folder, hover over the folder and click the delete button

    Notes in deleted folders will be moved to "No Folder"

    Click on any folder to view all notes inside it

    Click "Back to Folders" to return to the folder list

Using Pin and Favorite Features

    When creating or editing a note, use the toggles in the right sidebar

    Turn on "Pin to Top" to pin the note

    Turn on "Add to Favorites" to favorite the note

    Pinned notes appear on the Pinned page

    Favorite notes appear on the Favorites page

    Pinned and favorited notes do NOT appear on the Home page

Changing Theme

    Look for the dark mode button in the top header

    Click to toggle between light and dark themes

    Your preference is not saved between sessions

Exporting Notes as PDF

    Open any note in the editor

    Click the "Download PDF" button in the top header

    A new window will open with a print-friendly version

    Use the browser's print dialog to save as PDF

Logging Out

    Click on your profile section at the bottom of the sidebar

    A modal will appear with your user information

    Click the "Logout" button

    You will be redirected to the login page

    All stored tokens will be removed from your browser

Troubleshooting
Backend Won't Start

Issue: MongoDB connection error

Solution:

    Ensure MongoDB is running locally or your Atlas URI is correct

    Check your MONGO_URI in the .env file

    For local MongoDB, run 'mongod' in a separate terminal

Issue: Port 5000 already in use

Solution:

    Change the PORT value in your .env file to a different number

    Kill the process using port 5000 (lsof -i :5000 on Mac/Linux)

Issue: JWT_SECRET not set

Solution:

    Ensure JWT_SECRET is defined in your .env file

    Use a long random string for better security

Frontend Issues

Issue: Cannot connect to backend

Solution:

    Ensure backend is running on http://localhost:5000

    Check for CORS errors in browser console

    Verify the API_URL in frontend JavaScript files matches your backend URL

Issue: Login fails even with correct credentials

Solution:

    Clear browser localStorage (F12 -> Application -> Clear storage)

    Ensure backend is connected to the correct database

    Check if user exists in the users collection

Issue: Notes not saving or loading

Solution:

    Check browser console for any API errors

    Verify authentication token exists in localStorage

    Ensure backend routes are properly configured

Common Error Messages

"Invalid credentials"

    Your email or password is incorrect

    Reset your password or create a new account

"Not authorized, no token"

    You are not logged in

    Login again to get a new token

"Failed to fetch note"

    Network connection issue

    Backend server may be down

    Check if note ID is valid

"Server not reachable"

    Backend is not running

    Start the backend with 'npm run dev'

    Check if port 5000 is accessible

License

This project is licensed under the ISC License.
Support

For issues, questions, or contributions, please open an issue on the GitHub repository or contact the development team.
Acknowledgments

    Tailwind CSS for the utility-first CSS framework

    MongoDB for the flexible NoSQL database

    Express.js for the minimalist web framework

    Node.js for the JavaScript runtime

    Google Fonts and Material Icons for typography and icons

Version History

Version 1.0.0 - Initial release

    Complete authentication system

    Full CRUD operations for notes

    Folder organization system

    Pin and favorite features

    Rich text editor with formatting

    Dark mode support

    PDF export functionality

    Real-time search

    Responsive design
