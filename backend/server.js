import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// Load Environment Variables
dotenv.config();

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";
import shareRoutes from "./routes/shareRoutes.js";

import { errorMiddleware } from "./middleware/errorMiddleware.js";



// Connect Database
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "AI Travel Itinerary API Running Successfully 🚀",
  });
});

// API Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/itinerary",
  itineraryRoutes
);

app.use(
  "/api/share",
  shareRoutes
);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});
// Error Middleware
app.use(errorMiddleware);

// Start Server
const PORT =
  process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server Running on Port  http://localhost:${PORT}`
  );
});


