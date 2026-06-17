# ✈️ AI Travel Itinerary Generator

An AI-powered travel planning application built with the MERN Stack that allows users to upload travel booking documents (PDFs or Images), extract travel details using OCR, and generate intelligent travel itineraries using AI.

---

## 🚀 Live Demo

Frontend:
https://your-frontend-url.com

Backend:
https://your-backend-url.com

---

## 📌 Features

### 🔐 Authentication
- JWT-based Authentication
- User Registration
- User Login
- Protected Routes
- Secure API Access

### 📄 Travel Document Upload
- Upload Flight Tickets
- Upload Hotel Bookings
- Upload Travel Tickets
- Supports:
  - PDF Files
  - JPG/JPEG Images
  - PNG Images

### 🔍 OCR Data Extraction
- Text extraction from Images using Tesseract.js
- Text extraction from PDFs
- Automatic travel information parsing

### 🤖 AI Itinerary Generation
- Generates travel itinerary using AI
- Uses OpenAI / Gemini API
- Structured day-wise itinerary
- Travel recommendations
- Activity suggestions

### 🗄️ Itinerary Management
- Save itineraries in MongoDB
- View itinerary history
- Delete itineraries
- Track previous generated itineraries

### 🔗 Shareable Itineraries
- Unique public share links
- Share generated itineraries with anyone
- No login required for shared itinerary access

### 🎨 Responsive UI
- React.js
- Tailwind CSS
- Mobile Friendly
- Modern Design

---

# 🏗️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

## OCR

- Tesseract.js
- PDF Text Extraction

## AI

- Google Gemini API
OR
- OpenAI API

---

# 📂 Project Structure

## Backend

```bash
backend/
│
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── controllers/
│   ├── authController.js
│   └── itineraryController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   └── Itinerary.js
│
├── routes/
│   ├── authRoutes.js
│   ├── itineraryRoutes.js
│   └── shareRoutes.js
│
├── services/
│   ├── aiService.js
│   └── ocrService.js
│
├── utils/
│   ├── generateToken.js
│   └── extractTravelInfo.js
│
├── uploads/
├── .env
├── server.js
└── package.json
```

---

## Frontend

```bash
frontend/
│
├── src/
│
├── api/
│   ├── axios.js
│   ├── itineraryApi.js
│   └── shareApi.js
│
├── components/
│   ├── Navbar.jsx
│   ├── Loader.jsx
│   ├── UploadBox.jsx
│   ├── ItineraryCard.jsx
│   └── ProtectedRoute.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Upload.jsx
│   ├── History.jsx
│   └── SharedItinerary.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# ⚙️ Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/ai-travel-itinerary-generator.git
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Auth Routes

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

### Get Profile

```http
GET /api/auth/me
```

---

## Itinerary Routes

### Upload Booking

```http
POST /api/itinerary/upload
```

### Get User Itineraries

```http
GET /api/itinerary/my
```

### Delete Itinerary

```http
DELETE /api/itinerary/:id
```

---

## Share Routes

### Public Itinerary

```http
GET /api/share/:shareId
```

---

# Workflow

1. User Registers/Login
2. Uploads Travel Document
3. OCR Extracts Text
4. AI Processes Travel Details
5. AI Generates Itinerary
6. Itinerary Saved in MongoDB
7. User Views History
8. User Shares Itinerary Link

---

# Bonus Features Implemented

✅ JWT Authentication

✅ OCR Extraction

✅ AI Itinerary Generation

✅ MongoDB Storage

✅ Shareable Public Links

✅ Responsive UI

✅ Protected Routes

✅ File Upload Support

---

# Future Improvements

- AWS S3 File Storage
- Drag & Drop Upload
- Multi-Day Planner
- Maps Integration
- Weather Integration
- Budget Estimation
- AI Travel Chat Assistant
- PDF Export
- Email Sharing

---

# Author

### Jhunna Kumar

B.Tech (AI & ML)

Jodhpur Institute of Engineering & Technology

2026 Batch

---

# Thank You

This project was developed as part of the Trrip Junior Full Stack Developer (MERN + AI) Assignment.
