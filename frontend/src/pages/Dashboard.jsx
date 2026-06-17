import React, {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FiUpload,
  FiFileText,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Dashboard = () => {
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [itineraries, setItineraries] =
    useState([]);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries =
    async () => {
      try {
        const { data } =
          await API.get(
            "/itinerary/my"
          );

        setItineraries(
          data.itineraries
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">

        <div className="max-w-7xl mx-auto p-6">

          {/* Welcome */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white mb-8">

            <h1 className="text-3xl font-bold">
              Welcome,
              {" "}
              {user?.name}
              👋
            </h1>

            <p className="mt-3 text-blue-100">
              Upload your travel bookings
              and generate AI-powered
              itineraries instantly.
            </p>

            <Link
              to="/upload"
              className="inline-flex items-center gap-2 mt-6 bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold hover:bg-gray-100"
            >
              <FiUpload />
              Upload Booking
            </Link>

          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white p-6 rounded-2xl shadow-sm">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Total Itineraries
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {
                      itineraries.length
                    }
                  </h2>

                </div>

                <FiFileText
                  size={40}
                  className="text-blue-600"
                />

              </div>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Recent Uploads
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {Math.min(
                      itineraries.length,
                      5
                    )}
                  </h2>

                </div>

                <FiClock
                  size={40}
                  className="text-green-600"
                />

              </div>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    AI Generated
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {
                      itineraries.length
                    }
                  </h2>

                </div>

                <FiUpload
                  size={40}
                  className="text-purple-600"
                />

              </div>

            </div>

          </div>

          {/* Recent Itineraries */}
          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Recent Itineraries
              </h2>

              <Link
                to="/history"
                className="flex items-center gap-2 text-blue-600 font-medium"
              >
                View All
                <FiArrowRight />
              </Link>

            </div>

            {itineraries.length === 0 ? (
              <div className="text-center py-10">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
                  alt="empty"
                  className="w-32 mx-auto"
                />

                <h3 className="mt-4 text-xl font-semibold">
                  No Itineraries Yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Upload your first travel
                  booking to generate an
                  AI itinerary.
                </p>

              </div>
            ) : (
              <div className="space-y-4">

                {itineraries
                  .slice(0, 5)
                  .map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-xl p-4 hover:bg-gray-50 transition"
                    >
                      <h3 className="font-semibold text-lg">
                        {
                          item.fileName
                        }
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </p>

                      <Link
                        to="/history"
                        className="inline-block mt-3 text-blue-600 font-medium"
                      >
                        View Details →
                      </Link>

                    </div>
                  ))}

              </div>
            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;