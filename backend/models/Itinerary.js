import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["pdf", "image"],
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    extractedData: {
      flightNumber: {
        type: String,
        default: "",
      },

      departureCity: {
        type: String,
        default: "",
      },

      arrivalCity: {
        type: String,
        default: "",
      },

      travelDate: {
        type: String,
        default: "",
      },

      travelTime: {
        type: String,
        default: "",
      },

      hotelName: {
        type: String,
        default: "",
      },

      hotelAddress: {
        type: String,
        default: "",
      },

      checkInDate: {
        type: String,
        default: "",
      },

      checkOutDate: {
        type: String,
        default: "",
      },
    },

    aiItinerary: {
      type: String,
      required: true,
    },

    shareId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Itinerary = mongoose.model(
  "Itinerary",
  itinerarySchema
);

export default Itinerary;