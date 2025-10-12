// src/services/authService.js
import { API } from "../../api";
export const authService = {
  // Register (Signup)
  signup: async (email, password) => {
    try {
      const response = await API.post("/auth/signup", { email, password });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message || error };
    }
  },

  // Email Verification
  confirmSignup: async (email, confirmationCode) => {
    try {
      const response = await API.post("/auth/confirm-signup", {
        email,
        confirmationCode,
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message || error };
    }
  },

  // Login (Signin)
  signin: async (email, password) => {
    try {
      const response = await API.post("/auth/signin", { email, password });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message || error };
    }
  },

  // Logout (Signout)
  signout: async () => {
    try {
      const response = await API.post("/auth/signout");
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message || error };
    }
  },

  // Resend Verification Code
  resendVerificationCode: async (email) => {
    try {
      const response = await API.post("/auth/resend-verification", { email });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message || error };
    }
  },

  // Forgot Password
  forgotPassword: async (email) => {
    try {
      const response = await API.post("/auth/forgot-password", { email });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message || error };
    }
  },

  // Confirm Forgot Password
  confirmForgotPassword: async (email, confirmationCode, newPassword) => {
    try {
      const response = await API.post("/auth/confirm-forgot-password", {
        email,
        confirmationCode,
        newPassword,
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message || error };
    }
  },
};
