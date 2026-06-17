import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import cloudinary from "../config/cloudinary.js";
import Itinerary from "../models/Itinerary.js";

import {
  extractTextFromImage,
  extractTextFromPdf,
} from "../services/ocrService.js";

import {
  extractTravelInfo,
} from "../utils/extractTravelInfo.js";

import {
  generateItinerary,
} from "../services/geminiService.js";

// Upload + Generate Itinerary
export const uploadAndGenerate =
  async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload a file",
        });
      }

      // Upload to Cloudinary
      const uploadedFile =
        await cloudinary.uploader.upload(
          file.path,
          {
            resource_type:
              "auto",
          }
        );

      // OCR Extraction
      let extractedText = "";

      if (
        file.mimetype ===
        "application/pdf"
      ) {
        extractedText =
          await extractTextFromPdf(
            file.path
          );
      } else {
        extractedText =
          await extractTextFromImage(
            file.path
          );
      }

      // Structured Data
      const extractedData =
        extractTravelInfo(
          extractedText
        );

      // AI Generation
      const aiItinerary =
        await generateItinerary(
          extractedData,
          extractedText
        );

      // Save MongoDB
      const itinerary =
        await Itinerary.create({
          user: req.user._id,

          fileName:
            file.originalname,

          fileUrl:
            uploadedFile.secure_url,

          fileType:
            file.mimetype.includes(
              "pdf"
            )
              ? "pdf"
              : "image",

          extractedText,
          extractedData,
          aiItinerary,

          shareId: uuidv4(),
        });

      // Remove local file
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      res.status(201).json({
        success: true,
        itinerary,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get All User Itineraries
export const getMyItineraries =
  async (req, res) => {
    try {
      const itineraries =
        await Itinerary.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        itineraries,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get Single Itinerary
export const getItineraryById =
  async (req, res) => {
    try {
      const itinerary =
        await Itinerary.findById(
          req.params.id
        );

      if (!itinerary) {
        return res.status(404).json({
          success: false,
          message:
            "Itinerary not found",
        });
      }

      res.status(200).json({
        success: true,
        itinerary,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Delete Itinerary
export const deleteItinerary =
  async (req, res) => {
    try {
      const itinerary =
        await Itinerary.findById(
          req.params.id
        );

      if (!itinerary) {
        return res.status(404).json({
          success: false,
          message:
            "Itinerary not found",
        });
      }

      await itinerary.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Itinerary deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };