import express from "express";

import {
  uploadAndGenerate,
  getMyItineraries,
  getItineraryById,
  deleteItinerary,
} from "../controllers/itineraryController.js";

import {
  isAuthenticated,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Upload travel document + generate itinerary
router.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  uploadAndGenerate
);

// Get all user itineraries
router.get(
  "/my",
  isAuthenticated,
  getMyItineraries
);

// Get single itinerary
router.get(
  "/:id",
  isAuthenticated,
  getItineraryById
);

// Delete itinerary
router.delete(
  "/:id",
  isAuthenticated,
  deleteItinerary
);

export default router;