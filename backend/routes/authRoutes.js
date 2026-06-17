import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";

import {
  isAuthenticated,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post(
  "/register",
  registerUser
);

// Login
router.post(
  "/login",
  loginUser
);

// Profile
router.get(
  "/profile",
  isAuthenticated,
  getProfile
);

export default router;