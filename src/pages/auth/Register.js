// src/pages/auth/Register.js
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { rocPurpleLogo } from "assets/images";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState("signup");

  const { signUp, confirmSignUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp(formData.email, formData.password);

      if (result.success) {
        setSuccess(
          "Account created! Please check your email for a verification code."
        );
        setStep("verify");
      } else {
        if (result.userExists) {
          if (result.isVerified) {
            setError(
              `Email ${formData.email} is already registered and verified. Please sign in instead.`
            );
            setTimeout(() => {
              navigate(
                `/auth/login?email=${encodeURIComponent(formData.email)}`
              );
            }, 2000);
          } else {
            setSuccess(
              `Email ${formData.email} is registered but not verified. Please check your email for the verification code.`
            );
            setStep("verify");
          }
        } else {
          setError(result.message || "Signup failed");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred during signup");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await confirmSignUp(formData.email, confirmationCode);

      if (result.success) {
        setSuccess("Email verified successfully! 🎉");
        setStep("success");

        setTimeout(() => {
          navigate("/auth/login?verified=true");
        }, 3000);
      } else {
        setError(result.message || "Verification failed");
      }
    } catch (err) {
      setError("Verification failed. Please check your code and try again.");
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signUp(formData.email, formData.password);
      if (result.success) {
        setSuccess("New verification code sent to your email!");
      } else {
        setError("Failed to resend code");
      }
    } catch (err) {
      setError("Failed to resend verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rocPurple-100 to-rocBlue-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 mx-4">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <img
            src={rocPurpleLogo}
            alt="Realty on Chain"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-rocBlack-100 font-manrope">
            Realty on Chain
          </h1>
          <p className="text-rocBlack-200 mt-2 font-manrope">
            {step === "signup" && "Create your account"}
            {step === "verify" && "Verify your email address"}
            {step === "success" && "Account verified successfully!"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium font-manrope ${
                step === "signup"
                  ? "bg-rocPurple-300 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {step === "signup" ? "1" : "✓"}
            </div>
            <div
              className={`w-16 h-1 mx-2 ${
                step === "verify" || step === "success"
                  ? "bg-rocPurple-300"
                  : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium font-manrope ${
                step === "verify"
                  ? "bg-rocPurple-300 text-white"
                  : step === "success"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step === "success" ? "✓" : "2"}
            </div>
            <div
              className={`w-16 h-1 mx-2 ${
                step === "success" ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium font-manrope ${
                step === "success"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step === "success" ? "✓" : "3"}
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

        {/* Step 1: Signup Form */}
        {step === "signup" && (
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-rocBlack-100 mb-2 font-manrope">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rocPurple-300 focus:border-rocPurple-300 font-manrope"
                placeholder="Create a strong password"
              />
              <p className="text-xs text-gray-500 mt-1 font-manrope">
                Min 8 characters, uppercase, lowercase, number, special char
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-rocBlack-100 mb-2 font-manrope">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rocPurple-300 focus:border-rocPurple-300 font-manrope"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rocPurple-300 text-white py-3 px-4 rounded-lg font-medium font-manrope hover:bg-rocPurple-400 focus:ring-4 focus:ring-rocPurple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        )}

        {/* Step 2: Verification */}
        {step === "verify" && (
          <div className="text-center">
            <div className="text-6xl mb-6">📧</div>
            <h3 className="text-lg font-semibold mb-2 font-manrope">
              Check Your Email
            </h3>
            <p className="text-rocBlack-200 mb-6 font-manrope">
              We sent a 6-digit verification code to
              <br />
              <strong className="text-rocBlack-100">{formData.email}</strong>
            </p>

            <form onSubmit={handleVerification} className="space-y-6">
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
                  Enter the 6-digit code from your email
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || confirmationCode.length !== 6}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium font-manrope hover:bg-green-700 focus:ring-4 focus:ring-green-200 disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </button>
            </form>

            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={resendCode}
                disabled={isLoading}
                className="text-rocPurple-300 hover:underline text-sm disabled:opacity-50 font-manrope"
              >
                Didn't receive the code? Resend
              </button>
              <br />
              <button
                type="button"
                onClick={() => setStep("signup")}
                className="text-rocBlack-200 hover:underline text-sm font-manrope"
              >
                ← Back to registration
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <div className="text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-xl font-bold text-green-600 mb-4 font-manrope">
              Account Verified!
            </h3>
            <p className="text-rocBlack-200 mb-8 font-manrope">
              Your email has been successfully verified.
              <br />
              You can now sign in to your account.
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
        {step === "signup" && (
          <div className="text-center mt-6">
            <p className="text-sm text-rocBlack-200 font-manrope">
              Already have an account?{" "}
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
