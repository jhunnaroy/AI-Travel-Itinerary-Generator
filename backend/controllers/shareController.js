import Itinerary from "../models/Itinerary.js";

// Public Shared Itinerary
export const getSharedItinerary =
  async (req, res) => {
    try {
      const itinerary =
        await Itinerary.findOne({
          shareId:
            req.params.shareId,
        }).populate(
          "user",
          "name email"
        );

      if (!itinerary) {
        return res.status(404).json({
          success: false,
          message:
            "Shared itinerary not found",
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