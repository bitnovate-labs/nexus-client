import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/auth";
import { isTokenExpired, getTokenExpiryTime } from "../utils/tokenUtils";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [loginMutation] = useMutation(LOGIN);
  const logoutTimer = useRef();

  const clearLogoutTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  };

  const setupAutoLogout = useCallback((token) => {
    clearLogoutTimer();

    const expiryTime = getTokenExpiryTime(token);
    if (!expiryTime) return;

    const timeUntilExpiry = expiryTime - Date.now();
    if (timeUntilExpiry <= 0) {
      logout("Your session has expired. Please log in again.");
      return;
    }

    // Set timer to logout at exact expiry time
    logoutTimer.current = setTimeout(() => {
      logout("Your session has expired. Please log in again.");
    }, timeUntilExpiry);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        logout("Your session has expired. Please log in again.");
      } else {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
        setupAutoLogout(token);
      }
    }
    setLoading(false);

    return () => clearLogoutTimer();
  }, [setupAutoLogout]);

  const login = async (username, password) => {
    try {
      const { data } = await loginMutation({
        variables: { username, password },
      });

      const { token, user: userData } = data.login;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Store credentials securely for session extension
      sessionStorage.setItem(
        "auth_credentials",
        btoa(JSON.stringify({ username, password }))
      );

      setUser(userData);
      setupAutoLogout(token);

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
      message.success("Login successful");
      return true;
    } catch (error) {
      message.error(error.message);
      return false;
    }
  };

  const extendSession = async () => {
    try {
      const credentialsStr = sessionStorage.getItem("auth_credentials");
      if (!credentialsStr) {
        throw new Error("No stored credentials");
      }

      const { username, password } = JSON.parse(atob(credentialsStr));
      const { data } = await loginMutation({
        variables: { username, password },
      });

      const { token, user: userData } = data.login;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setupAutoLogout(token);
      return true;
    } catch (error) {
      console.error("Failed to extend session:", error);
      return false;
    }
  };

  const logout = (customMessage) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("auth_credentials");
    setUser(null);
    clearLogoutTimer();
    navigate("/login");

    if (customMessage) {
      message.info(customMessage);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    extendSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
