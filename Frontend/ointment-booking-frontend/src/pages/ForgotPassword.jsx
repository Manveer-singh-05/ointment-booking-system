import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:4000/auth/forgot-password", { email });
      setStep(2);
      setMessage("OTP sent to your email!");
    } catch (err) {
      setMessage("Email not found");
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:4000/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      setMessage("Password reset successfully!");
      setStep(3);
    } catch (err) {
      setMessage("Invalid OTP or expired");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center 
      bg-gradient-to-br from-blue-100 to-gray-200"
    >
      <div
        className="
          w-[420px] p-10 rounded-3xl shadow-xl 
          bg-white/20 backdrop-blur-xl 
          border border-white/40 
          transition-all duration-300
        "
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Forgot Password
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full px-4 py-3 mb-4 rounded-xl border border-white/50 
                bg-white/40 backdrop-blur-md 
                focus:ring-2 focus:ring-blue-400 outline-none 
              "
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              className="
                w-full py-3 rounded-xl text-white font-semibold 
                bg-blue-600 hover:bg-blue-700 
                shadow-lg hover:shadow-xl 
                transition-all
              "
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="
                w-full px-4 py-3 mb-4 rounded-xl border border-white/50 
                bg-white/40 backdrop-blur-md 
                focus:ring-2 focus:ring-blue-400 outline-none 
              "
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="
                w-full px-4 py-3 mb-4 rounded-xl border border-white/50 
                bg-white/40 backdrop-blur-md 
                focus:ring-2 focus:ring-blue-400 outline-none
              "
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              className="
                w-full py-3 rounded-xl text-white font-semibold 
                bg-green-600 hover:bg-green-700 
                shadow-lg hover:shadow-xl 
                transition-all
              "
            >
              Reset Password
            </button>
          </>
        )}

        {/* Message */}
        {message && (
          <p className="text-center mt-4 text-gray-900 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
