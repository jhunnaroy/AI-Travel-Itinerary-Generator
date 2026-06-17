import API from "./axios";

// Register
export const registerUser = (
  userData
) => {
  return API.post(
    "/auth/register",
    userData
  );
};

// Login
export const loginUser = (
  userData
) => {
  return API.post(
    "/auth/login",
    userData
  );
};

// Profile
export const getProfile = () => {
  return API.get(
    "/auth/profile"
  );
};