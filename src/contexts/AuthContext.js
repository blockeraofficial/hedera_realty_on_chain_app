// src/contexts/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/wallets/authService";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("authUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user", error);
        sessionStorage.removeItem("authUser");
      }
    }
    setIsLoading(false);
  }, []);

  // Sign Up
  const signUp = async (email, password) => {
    try {
      const result = await authService.signup(email, password);

      if (result.success) {
        return { success: true };
      } else {
        // Check if user already exists
        const errorMessage = result.error?.toLowerCase() || "";

        if (
          errorMessage.includes("user already exists") ||
          errorMessage.includes("already registered")
        ) {
          // User exists, check if verified by attempting to sign in
          const checkResult = await authService.signin(email, password);

          if (checkResult.success) {
            // User exists and credentials are correct (verified)
            return {
              success: false,
              userExists: true,
              isVerified: true,
              message: "User already exists and is verified. Please sign in.",
            };
          } else {
            // User exists but not verified or wrong password
            return {
              success: false,
              userExists: true,
              isVerified: false,
              message:
                "User exists but not verified. Please check your email for verification code.",
            };
          }
        }

        return {
          success: false,
          message: result.error || "Signup failed",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
      };
    }
  };

  // Confirm Sign Up
  const confirmSignUp = async (email, code) => {
    try {
      const result = await authService.confirmSignup(email, code);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Verification failed",
      };
    }
  };

  // Sign In
  const signIn = async (email, password) => {
    try {
      const result = await authService.signin(email, password);

      if (result.success && result.data?.result) {
        const userData = result.data.result;
        setUser(userData);
        setIsAuthenticated(true);
        sessionStorage.setItem("authUser", JSON.stringify(userData));
        return { success: true, user: userData };
      }

      return {
        success: false,
        message: result.error || "Login failed",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      await authService.signout();
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("authUser");
      return { success: true };
    } catch (error) {
      console.error("Signout error:", error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("authUser");
      return { success: false };
    }
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    return await authService.forgotPassword(email);
  };

  // Confirm Forgot Password
  const confirmForgotPassword = async (email, code, newPassword) => {
    return await authService.confirmForgotPassword(email, code, newPassword);
  };

  // Resend Verification Code
  const resendVerificationCode = async (email) => {
    return await authService.resendVerificationCode(email);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
    forgotPassword,
    confirmForgotPassword,
    resendVerificationCode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
