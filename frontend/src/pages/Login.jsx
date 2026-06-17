import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import {
  useAuth,
} from "../context/AuthContext";

const Login = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const {
    email,
    password,
  } = formData;

  const changeHandler = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const submitHandler =
    async (e) => {
      e.preventDefault();

      setLoading(true);

      const result =
        await login(
          email,
          password
        );

      setLoading(false);

      if (
        result.success
      ) {
        navigate(
          "/dashboard"
        );
      } else {
        alert(
          result.message
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            AI
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue your journey
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={
            submitHandler
          }
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <div className="relative">

              <FiMail className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                value={email}
                onChange={
                  changeHandler
                }
                placeholder="Enter your email"
                required
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">

              <FiLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={
                  password
                }
                onChange={
                  changeHandler
                }
                placeholder="Enter password"
                required
                className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>

            </div>

          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">

          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;