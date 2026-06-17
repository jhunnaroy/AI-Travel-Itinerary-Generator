import mongoose from "mongoose";

const sharedItinerarySchema =
  new mongoose.Schema(
    {
      itinerary: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Itinerary",
        required: true,
      },

      shareId: {
        type: String,
        unique: true,
        required: true,
      },

      views: {
        type: Number,
        default: 0,
      },

      isPublic: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

const SharedItinerary =
  mongoose.model(
    "SharedItinerary",
    sharedItinerarySchema
  );

export default SharedItinerary;