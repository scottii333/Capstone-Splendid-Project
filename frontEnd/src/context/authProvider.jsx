// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  // Global authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/customer/check-auth",
          {
            withCredentials: true,
          }
        );
        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUserData(res.data.user);
        } else {
          setIsAuthenticated(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        setUserData(null);
      }
    };

    checkAuth();
  }, []);

  // Logout function to clear authentication state
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/customer/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      setUserData(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        setIsAuthenticated,
        setUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
