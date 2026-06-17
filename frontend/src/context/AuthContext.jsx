import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // Load User
  const loadUser =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          setLoading(false);
          return;
        }

        const { data } =
          await API.get(
            "/auth/profile"
          );

        setUser(data.user);
      } catch (error) {
        console.log(error);

        localStorage.removeItem(
          "token"
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const login = async (
    email,
    password
  ) => {
    try {
      const { data } =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        data.token
      );

      setUser(data.user);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data
            ?.message ||
          "Login Failed",
      };
    }
  };

  // Register
  const register =
    async (
      name,
      email,
      password
    ) => {
      try {
        const { data } =
          await API.post(
            "/auth/register",
            {
              name,
              email,
              password,
            }
          );

        localStorage.setItem(
          "token",
          data.token
        );

        setUser(data.user);

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          message:
            error.response?.data
              ?.message ||
            "Registration Failed",
        };
      }
    };

  // Logout
  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =
  () => {
    return useContext(
      AuthContext
    );
  };