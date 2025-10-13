// src/pages/auth/Login.js
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { rocPurpleLogo } from "assets/images";

export default function Login() {
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";
  const verified = searchParams.get("verified");
  const reset = searchParams.get("reset");

  const [email, setEmail] = useState(emailFromUrl);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn(email, password);

      if (result.success) {
        navigate("/");
      } else {
        setError(
          result.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rocPurple-100 to-rocBlue-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={rocPurpleLogo}
            alt="Realty on Chain"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-rocBlack-100 font-manrope">
            Welcome Back
          </h1>
          <p className="text-rocBlack-200 mt-2 font-manrope">
            Sign in to your account
          </p>
        </div>

        {/* Success message from registration */}
        {verified && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 text-sm font-manrope">
              ✅ Email verified successfully! Please login.
            </p>
          </div>
        )}

        {reset === "success" && ( // ← YENİ EKLE
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 text-sm font-manrope">
              ✅ Password reset successful! Please login with your new password.
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm font-manrope">❌ {error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-rocBlack-100 mb-2 font-manrope">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rocPurple-300 focus:border-rocPurple-300 font-manrope"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rocBlack-100 mb-2 font-manrope">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rocPurple-300 focus:border-rocPurple-300 font-manrope"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-rocPurple-300 border-gray-300 rounded focus:ring-rocPurple-300"
              />
              <span className="ml-2 text-sm text-rocBlack-200 font-manrope">
                Remember me
              </span>
            </label>
            <a
              href="/#/auth/forgot-password"
              className="text-sm text-rocPurple-300 hover:underline font-manrope"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rocPurple-300 text-white py-3 px-4 rounded-lg font-medium font-manrope hover:bg-rocPurple-400 focus:ring-4 focus:ring-rocPurple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-rocBlack-200 font-manrope">
            Don't have an account?{" "}
            <a
              href="/#/auth/register"
              className="text-rocPurple-300 hover:underline font-medium"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
