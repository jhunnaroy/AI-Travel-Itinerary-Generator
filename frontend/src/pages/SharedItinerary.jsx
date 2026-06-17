import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Loader from "../components/Loader";
import {
  getSharedItinerary,
} from "../api/shareApi";

const SharedItinerary = () => {
  const { shareId } =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [itinerary, setItinerary] =
    useState(null);

  const fetchItinerary =
    async () => {
      try {
        const { data } =
          await getSharedItinerary(
            shareId
          );

        setItinerary(
          data.itinerary
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchItinerary();
  }, [shareId]);

  if (loading) {
    return <Loader />;
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-red-500">
          Itinerary Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-600 text-white py-8">

        <div className="max-w-5xl mx-auto px-4">

          <h1 className="text-4xl font-bold">
            AI Travel Itinerary
          </h1>

          <p className="mt-2 text-blue-100">
            Shared Travel Plan
          </p>

        </div>

      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-10">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-2">
            {itinerary.fileName}
          </h2>

          <p className="text-gray-500 mb-6">
            Created On :
            {" "}
            {new Date(
              itinerary.createdAt
            ).toLocaleDateString()}
          </p>

          <div className="bg-gray-50 border rounded-xl p-6 whitespace-pre-wrap leading-8 text-gray-700">
            {
              itinerary.aiItinerary
            }
          </div>

        </div>

      </div>

    </div>
  );
};

export default SharedItinerary;