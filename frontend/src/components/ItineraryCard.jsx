import React from "react";
import {
  FiCalendar,
  FiFileText,
  FiShare2,
  FiTrash2,
  FiEye,
} from "react-icons/fi";

const ItineraryCard = ({
  itinerary,
  onDelete,
}) => {
  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/share/${itinerary.shareId}`;

    navigator.clipboard.writeText(
      shareUrl
    );

    alert(
      "Share link copied!"
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div>
          <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <FiFileText />
            {itinerary.fileName}
          </h2>

          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <FiCalendar />
            {new Date(
              itinerary.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          AI Generated
        </span>

      </div>

      {/* Travel Details */}
      {itinerary.extractedData && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">
              Flight
            </p>

            <p className="font-medium">
              {itinerary.extractedData
                ?.flightNumber ||
                "N/A"}
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">
              Travel Date
            </p>

            <p className="font-medium">
              {itinerary.extractedData
                ?.travelDate ||
                "N/A"}
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">
              Departure
            </p>

            <p className="font-medium">
              {itinerary.extractedData
                ?.departureCity ||
                "N/A"}
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">
              Destination
            </p>

            <p className="font-medium">
              {itinerary.extractedData
                ?.arrivalCity ||
                "N/A"}
            </p>
          </div>

        </div>
      )}

      {/* AI Preview */}
      <div className="mt-4 bg-gray-50 p-3 rounded-lg">

        <h3 className="font-semibold text-gray-700 mb-2">
          AI Itinerary Preview
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3">
          {itinerary.aiItinerary?.slice(
            0,
            200
          )}
          ...
        </p>

      </div>

      {/* Buttons */}
      <div className="mt-5 flex flex-wrap gap-3">

        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <FiEye />
          View
        </button>

        <button
          onClick={copyShareLink}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          <FiShare2 />
          Share
        </button>

        <button
          onClick={() =>
            onDelete(
              itinerary._id
            )
          }
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FiTrash2 />
          Delete
        </button>

      </div>
    </div>
  );
};

export default ItineraryCard;