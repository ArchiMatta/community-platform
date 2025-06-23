# community-platform
A simple, responsive social media-like app where users can sign up, log in, create posts (with image uploads), like posts, and view their own profile.

---

## 🚀 Tech Stack Used

| Layer        | Technology                       |
|--------------|----------------------------------|
| Frontend     | React, Axios, CSS (Media Queries) |
| Backend      | Node.js, Express.js              |
| Database     | MongoDB Atlas (cloud)            |
| Auth         | JWT (JSON Web Tokens)            |
| Image Upload | Cloudinary (External Service)    |
| API Testing  | Postman                          |

---
## ☁️ Deployment

The frontend of this application is deployed on **Vercel**, and the backend API is deployed on **Render**.

**Live Demo:** [https://community-platform-eight.vercel.app/](https://community-platform-eight.vercel.app/)

---
## 📦 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ArchiMatta/community-platform.git
cd community-platform
```

### 2. Backend Setup

```bash
cd server
npm install
```

### Create a `.env` file

Inside the `server` folder, create a `.env` file with the following content:

```env
MONGO_URI=your_mongo_atlas_connection_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Start the Backend Server

```bash
npm start
```

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend will run on: [http://localhost:3000](http://localhost:3000)

## ✨ Key Features

- ✅ **User Signup & Login**
- ✅ **JWT-based Protected Routes**
- ✅ **Create Posts** (Text + Optional Image)
- ✅ **Like Posts** (Medium-style Claps)
- ✅ **View and Update User Profile**
- ✅ **Image Upload with Size Limit**
- ✅ **Loading Spinners on API Calls**
- ✅ **Responsive Design** (Mobile & Desktop)
- ✅ **Navbar with Logout & Navigation**

##  JWT Auth Overview

- JWT is issued on successful login  
- Stored in `localStorage`  
- Automatically attached to protected API requests via `Authorization` header  
- Verified on backend using middleware

## Image Upload

- Users can upload images with posts and profile  
- Images are uploaded to **Cloudinary** and URLs are stored in MongoDB documents. 
- **5MB** size limit is enforced in the frontend  
- **Preview** of the image is shown before upload

##  Limitations

-  No email verification or password reset  
-  JWT stored in `localStorage` (less secure than HttpOnly cookies)   
-  No edit/delete post functionality yet  
-  No search, filters, or pagination yet

## 🧪 API Endpoints Tested with Postman

- `POST /api/auth/signup` — User signup  
- `POST /api/auth/login` — User login  
- `GET /api/users/:id` — Get user profile  
- `PUT /api/users/:id` — Update user profile  
- `POST /api/posts` — Create post  
- `GET /api/posts` — Get all posts (feed)  
- `POST /api/posts/:id/like` — Like a post

## 📁 Folder Structure

```bash
.
├── client/                # React frontend
│   ├── pages/             # UI pages (Login, Signup, Feed, etc.)
│   ├── components/        # Reusable components (Navbar, Spinner, etc.)
│   └── api/               # Axios configuration
├── server/                # Node + Express backend
│   ├── routes/            # Express route definitions
│   ├── controllers/       # API logic handlers
│   ├── models/            # Mongoose schemas
│   ├── middleware/        # JWT verification middleware
│   └── utils/             # Utility functions
└── README.md
