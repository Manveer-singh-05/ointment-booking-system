import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // STEP 1 – Send OTP
  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:4000/auth/forgot-password", { email });
      setStep(2);
      setMessage("OTP sent to your email!");
    } catch (err) {
      setMessage("Email not found");
    }
  };

  // STEP 2 – Submit OTP + New Password
  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:4000/auth/reset-password", {
        email,
        otp,
        newPassword
      });

      setMessage("Password reset successfully!");
      setStep(3);
    } catch (err) {
      setMessage("Invalid OTP or expired");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-xl w-[400px]">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Forgot Password
        </h2>

        {/* STEP 1: ENTER EMAIL */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-4 py-3 rounded-lg mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2: ENTER OTP + NEW PASSWORD */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border px-4 py-3 rounded-lg mb-4"
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border px-4 py-3 rounded-lg mb-4"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Reset Password
            </button>
          </>
        )}

        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
