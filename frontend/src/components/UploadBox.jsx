import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  FiUploadCloud,
  FiFile,
  FiX,
} from "react-icons/fi";

const UploadBox = ({
  file,
  setFile,
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (
        acceptedFiles &&
        acceptedFiles.length > 0
      ) {
        setFile(
          acceptedFiles[0]
        );
      }
    },
    [setFile]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [
        ".pdf",
      ],
      "image/png": [
        ".png",
      ],
      "image/jpeg": [
        ".jpg",
        ".jpeg",
      ],
      "image/webp": [
        ".webp",
      ],
    },
  });

  return (
    <div className="w-full">

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300
        ${
          isDragActive
            ? "border-blue-600 bg-blue-50"
            : "border-gray-300 bg-white hover:border-blue-500 hover:bg-gray-50"
        }`}
      >
        <input
          {...getInputProps()}
        />

        <FiUploadCloud
          size={60}
          className="mx-auto text-blue-600 mb-4"
        />

        <h3 className="text-xl font-semibold text-gray-800">
          Drag & Drop Files
        </h3>

        <p className="text-gray-500 mt-2">
          Upload Flight Tickets,
          Hotel Bookings,
          Travel Documents
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Supported: PDF,
          JPG, PNG, WEBP
        </p>

        <button
          type="button"
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          Browse Files
        </button>
      </div>

      {/* Selected File */}
      {file && (
        <div className="mt-5 bg-white border rounded-xl p-4 shadow-sm">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">
              <FiFile
                size={24}
                className="text-blue-600"
              />

              <div>
                <h4 className="font-medium text-gray-800">
                  {file.name}
                </h4>

                <p className="text-sm text-gray-500">
                  {(
                    file.size /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setFile(null)
              }
              className="text-red-500 hover:text-red-700"
            >
              <FiX
                size={22}
              />
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;