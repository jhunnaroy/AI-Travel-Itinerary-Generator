import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiUpload,
  FiClock,
  FiHome,
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] =
    useState(false);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2"
          >
            <div className="bg-blue-600 text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center">
              AI
            </div>

            <div>
              <h1 className="font-bold text-lg text-gray-800">
                Travel AI
              </h1>

              <p className="text-xs text-gray-500">
                Itinerary Generator
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FiHome />
              Dashboard
            </Link>

            <Link
              to="/upload"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FiUpload />
              Upload
            </Link>

            <Link
              to="/history"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FiClock />
              History
            </Link>

            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <FiLogOut />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() =>
              setIsOpen(!isOpen)
            }
          >
            {isOpen ? (
              <FiX />
            ) : (
              <FiMenu />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">

          <div className="flex flex-col p-4 space-y-4">

            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              onClick={() =>
                setIsOpen(false)
              }
            >
              <FiHome />
              Dashboard
            </Link>

            <Link
              to="/upload"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              onClick={() =>
                setIsOpen(false)
              }
            >
              <FiUpload />
              Upload
            </Link>

            <Link
              to="/history"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              onClick={() =>
                setIsOpen(false)
              }
            >
              <FiClock />
              History
            </Link>

            <button
              onClick={logoutHandler}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              <FiLogOut />
              Logout
            </button>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;