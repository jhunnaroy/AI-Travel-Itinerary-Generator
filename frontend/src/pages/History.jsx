import React, {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ItineraryCard from "../components/ItineraryCard";

import {
  getMyItineraries,
  deleteItinerary,
} from "../api/itineraryApi";

const History = () => {
  const [
    itineraries,
    setItineraries,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedItinerary,
    setSelectedItinerary,
  ] = useState(null);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries =
    async () => {
      try {
        const { data } =
          await getMyItineraries();

        setItineraries(
          data.itineraries
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const deleteHandler =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this itinerary?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteItinerary(id);

        setItineraries(
          itineraries.filter(
            (item) =>
              item._id !== id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    const handleShare = (
  shareId
) => {
  const shareLink =
    `${window.location.origin}/share/${shareId}`;

  navigator.clipboard.writeText(
    shareLink
  );

  alert(
    "Share link copied!"
  );
};

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">

        <div className="max-w-7xl mx-auto p-6">

          {/* Header */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              My Travel Itineraries
            </h1>

            <p className="text-gray-500 mt-2">
              View all your previously
              generated AI travel plans.
            </p>

          </div>

          {/* Empty State */}
          {itineraries.length ===
          0 ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm">

              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                alt="empty"
                className="w-40 mx-auto"
              />

              <h2 className="text-2xl font-bold mt-6">
                No Itineraries Found
              </h2>

              <p className="text-gray-500 mt-3">
                Upload a travel booking
                to generate your first
                AI itinerary.
              </p>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {itineraries.map(
                (
                  itinerary
                ) => (
                  <div
                    key={
                      itinerary._id
                    }
                    className="relative"
                  >
                   <ItineraryCard
  itinerary={itinerary}
  onDelete={deleteHandler}
/>

<div className="flex gap-2 mt-3">

  <button
    onClick={() =>
      setSelectedItinerary(
        itinerary
      )
    }
    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
  >
    View
  </button>

  <button
    onClick={() =>
      handleShare(
        itinerary.shareId
      )
    }
    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl"
  >
    Share
  </button>

</div>

                    <button
                      onClick={() =>
                        setSelectedItinerary(
                          itinerary
                        )
                      }
                      className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
                    >
                      View Full Itinerary
                    </button>

                  </div>
                )
              )}

            </div>
          )}

          {/* Modal */}
          {selectedItinerary && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

              <div className="bg-white max-w-3xl w-full rounded-3xl shadow-xl max-h-[90vh] overflow-y-auto">

                <div className="p-6 border-b flex justify-between items-center">

                  <h2 className="text-2xl font-bold">
                    AI Travel
                    Itinerary
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedItinerary(
                        null
                      )
                    }
                    className="text-red-500 text-xl"
                  >
                    ✕
                  </button>

                </div>

                <div className="p-6">

                  <h3 className="font-semibold mb-4">
                    {
                      selectedItinerary.fileName
                    }
                  </h3>

                  <div className="bg-gray-50 p-5 rounded-xl whitespace-pre-wrap leading-8 text-gray-700">
                    {
                      selectedItinerary.aiItinerary
                    }
                  </div>

                </div>

              </div>
 

            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default History;