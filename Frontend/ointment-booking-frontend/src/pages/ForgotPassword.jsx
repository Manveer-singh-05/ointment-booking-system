import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    await axios.post("http://localhost:4000/auth/forgot-password", { email });
    setMessage("Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-xl w-[400px]">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border px-4 py-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button 
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Send Reset Link
        </button>

        {message && <p className="text-green-600 mt-3">{message}</p>}
      </div>
    </div>
  );
}
