import React from "react";

const Loader = ({
  text = "Generating AI Itinerary...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">

      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="mt-4 text-gray-600 font-medium text-center">
        {text}
      </p>

    </div>
  );
};

export default Loader;