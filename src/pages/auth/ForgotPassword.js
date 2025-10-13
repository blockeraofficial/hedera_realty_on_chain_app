// src/pages/auth/ForgotPassword.js
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { rocPurpleLogo } from "assets/images";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: Code + Password, 3: Success

  const { forgotPassword, confirmForgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    try {
      const result = await forgotPassword(email);

      if (result.success) {
        setSuccess("Password reset code sent to your email!");
        setStep(2);
      } else {
        setError(result.error || "Failed to send reset code");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Forgot password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!confirmationCode || confirmationCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      setIsLoading(false);
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const result = await confirmForgotPassword(
        email,
        confirmationCode,
        newPassword
      );

      if (result.success) {
        setSuccess("Password reset successful! 🎉");
        setStep(3);

        // Auto redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/auth/login?reset=success");
        }, 3000);
      } else {
        setError(result.error || "Password reset failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Reset password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setSuccess("New reset code sent to your email!");
      } else {
        setError("Failed to resend code");
      }
    } catch (err) {
      setError("Failed to resend code");
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
            Reset Password
          </h1>
          <p className="text-rocBlack-200 mt-2 font-manrope">
            {step === 1 && "Enter your email to receive a reset code"}
            {step === 2 && "Enter the code and your new password"}
            {step === 3 && "Password reset successful!"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium font-manrope ${
                step === 1
                  ? "bg-rocPurple-300 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {step === 1 ? "1" : "✓"}
            </div>
            <div
              className={`w-16 h-1 mx-2 ${
                step >= 2 ? "bg-rocPurple-300" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium font-manrope ${
                step === 2
                  ? "bg-rocPurple-300 text-white"
                  : step === 3
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step === 3 ? "✓" : "2"}
            </div>
            <div
              className={`w-16 h-1 mx-2 ${
                step === 3 ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium font-manrope ${
                step === 3
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step === 3 ? "✓" : "3"}
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm font-manrope">❌ {error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 text-sm font-manrope">✅ {success}</p>
          </div>
        )}

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleRequestCode} className="space-y-6">
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
              <p className="text-xs text-gray-500 mt-2 font-manrope">
                We'll send a verification code to this email
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rocPurple-300 text-white py-3 px-4 rounded-lg font-medium font-manrope hover:bg-rocPurple-400 focus:ring-4 focus:ring-rocPurple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Code...
                </>
              ) : (
                "Send Reset Code"
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="text-sm text-rocPurple-300 hover:underline font-manrope"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Enter Code + New Password */}
        {step === 2 && (
          <div className="text-center">
            <div className="text-6xl mb-6">🔑</div>
            <h3 className="text-lg font-semibold mb-2 font-manrope">
              Check Your Email
            </h3>
            <p className="text-rocBlack-200 mb-6 font-manrope">
              We sent a 6-digit code to
              <br />
              <strong className="text-rocBlack-100">{email}</strong>
            </p>

            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) =>
                    setConfirmationCode(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  required
                  maxLength="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rocPurple-300 focus:border-rocPurple-300 text-center text-2xl tracking-widest font-mono"
                  placeholder="000000"
                />
                <p className="text-xs text-gray-500 mt-2 font-manrope">
                  Enter the 6-digit code
                </p>
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-rocBlack-100 mb-2 font-manrope">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rocPurple-300 focus:border-rocPurple-300 font-manrope"
                  placeholder="Enter new password"
                />
                <p className="text-xs text-gray-500 mt-1 font-manrope">
                  Min 8 characters, uppercase, lowercase, number, special char
                </p>
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-rocBlack-100 mb-2 font-manrope">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rocPurple-300 focus:border-rocPurple-300 font-manrope"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || confirmationCode.length !== 6}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium font-manrope hover:bg-green-700 focus:ring-4 focus:ring-green-200 disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-rocPurple-300 hover:underline text-sm disabled:opacity-50 font-manrope"
              >
                Didn't receive the code? Resend
              </button>
              <br />
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-rocBlack-200 hover:underline text-sm font-manrope"
              >
                ← Change email address
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center">
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-xl font-bold text-green-600 mb-4 font-manrope">
              Password Reset Successful!
            </h3>
            <p className="text-rocBlack-200 mb-8 font-manrope">
              Your password has been successfully reset.
              <br />
              You can now sign in with your new password.
            </p>

            <div className="flex items-center justify-center text-rocBlack-200 mb-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-rocPurple-300 mr-2"></div>
              <span className="font-manrope">Redirecting to login page...</span>
            </div>

            <button
              onClick={() => navigate("/auth/login")}
              className="text-rocPurple-300 hover:underline text-sm font-manrope"
            >
              Go to login now →
            </button>
          </div>
        )}

        {/* Footer */}
        {step === 1 && (
          <div className="text-center mt-6">
            <p className="text-sm text-rocBlack-200 font-manrope">
              Remember your password?{" "}
              <a
                href="/#/auth/login"
                className="text-rocPurple-300 hover:underline font-medium"
              >
                Sign in here
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
