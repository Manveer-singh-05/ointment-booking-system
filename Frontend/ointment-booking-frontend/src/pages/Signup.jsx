import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:4000/auth/signup", user);

      // Save token returned by backend
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/home");
    } catch (err) {
      setError("Email already exists or invalid input");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] flex flex-col">

      {/* NAVBAR */}
      <nav className="w-full bg-[#0d1a3a] text-white px-10 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">ProAppoint</h1>
        <Link to="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg">
          Login
        </Link>
      </nav>

      {/* MAIN CARD */}
      <div className="flex justify-center items-center flex-1 px-6">
        <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden w-[85%] max-w-6xl">

          {/* LEFT PANEL */}
          <div className="w-1/2 bg-gradient-to-br from-[#0d1a3a] to-[#163b70] text-white p-12 flex flex-col justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold mb-6">
              PA
            </div>

            <h2 className="text-3xl font-bold mb-8">Create Account</h2>

            <div className="space-y-4">
              <div className="bg-white/10 px-5 py-3 rounded-xl">✔ Register in seconds</div>
              <div className="bg-white/10 px-5 py-3 rounded-xl">✔ Book appointments instantly</div>
              <div className="bg-white/10 px-5 py-3 rounded-xl">✔ Track & manage bookings</div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-1/2 p-12 flex flex-col justify-center">

            <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            {/* Name */}
            <label className="text-gray-600 text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border px-4 py-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            {/* Email */}
            <label className="text-gray-600 text-sm mb-1">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-4 py-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            {/* Password */}
            <label className="text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border px-4 py-3 rounded-lg mb-6 focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            {/* Sign Up Button */}
            <button
              onClick={handleSignup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition shadow-md mb-3"
            >
              Create Account
            </button>

            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-blue-500 font-medium hover:underline">
                Login Here
              </Link>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}
