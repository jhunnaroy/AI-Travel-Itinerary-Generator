import API from "./axios";

// Public Shared Itinerary
export const getSharedItinerary =
  (shareId) => {
    return API.get(
      `/share/${shareId}`
    );
  };