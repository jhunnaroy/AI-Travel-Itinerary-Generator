import API from "./axios";

// Upload & Generate
export const uploadDocument = (
  formData
) => {
  return API.post(
    "/itinerary/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

// Get History
export const getMyItineraries =
  () => {
    return API.get(
      "/itinerary/my"
    );
  };

// Get Single
export const getItinerary =
  (id) => {
    return API.get(
      `/itinerary/${id}`
    );
  };

// Delete
export const deleteItinerary =
  (id) => {
    return API.delete(
      `/itinerary/${id}`
    );
  };