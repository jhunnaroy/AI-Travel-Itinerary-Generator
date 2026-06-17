import React, {
  useState,
} from "react";

import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import Loader from "../components/Loader";

import {
  uploadDocument,
} from "../api/itineraryApi";

import {
  FiCopy,
  FiCheck,
} from "react-icons/fi";

const Upload = () => {
  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [itinerary, setItinerary] =
    useState(null);

  const [copied, setCopied] =
    useState(false);

  const handleGenerate =
    async () => {
      if (!file) {
        return alert(
          "Please upload a file first."
        );
      }

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const { data } =
          await uploadDocument(
            formData
          );

        setItinerary(
          data.itinerary
        );

      } catch (error) {
        console.log(error);

        alert(
          error?.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  const copyHandler = () => {
    navigator.clipboard.writeText(
      itinerary?.aiItinerary
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">

        <div className="max-w-6xl mx-auto p-6">

          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Upload Travel Booking
            </h1>

            <p className="text-gray-500 mt-2">
              Upload flight tickets,
              hotel bookings or travel
              documents and generate
              an AI-powered itinerary.
            </p>

          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-3xl shadow-sm p-6">

            <UploadBox
              file={file}
              setFile={setFile}
            />

            <button
              onClick={
                handleGenerate
              }
              disabled={
                loading
              }
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Generate AI Itinerary
            </button>

          </div>

          {/* Loader */}
          {loading && (
            <div className="mt-8">
              <Loader />
            </div>
          )}

          {/* Generated Itinerary */}
          {itinerary && (
            <div className="mt-8 bg-white rounded-3xl shadow-sm p-6">

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <h2 className="text-2xl font-bold">
                  Generated Itinerary
                </h2>

                <button
                  onClick={
                    copyHandler
                  }
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  {copied ? (
                    <>
                      <FiCheck />
                      Copied
                    </>
                  ) : (
                    <>
                      <FiCopy />
                      Copy
                    </>
                  )}
                </button>

              </div>

              {/* Travel Details */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">

                <div className="bg-gray-50 p-4 rounded-xl">

                  <h3 className="font-semibold">
                    File Name
                  </h3>

                  <p className="text-gray-600">
                    {
                      itinerary.fileName
                    }
                  </p>

                </div>

                <div className="bg-gray-50 p-4 rounded-xl">

                  <h3 className="font-semibold">
                    Upload Date
                  </h3>

                  <p className="text-gray-600">
                    {new Date(
                      itinerary.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>

              {/* AI Result */}
              <div className="mt-6">

                <h3 className="font-semibold text-lg mb-3">
                  AI Travel Plan
                </h3>

                <div className="bg-gray-50 border rounded-xl p-5 whitespace-pre-wrap leading-8 text-gray-700">
                  {
                    itinerary.aiItinerary
                  }
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default Upload;