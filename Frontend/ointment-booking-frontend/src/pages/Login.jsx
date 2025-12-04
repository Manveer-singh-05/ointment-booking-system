import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home"); // redirect to home
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] flex flex-col">

      {/* NAVBAR */}
      <nav className="w-full bg-[#0d1a3a] text-white px-10 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">ProAppoint</h1>

        <Link
          to="/signup"
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition border border-white/20"
        >
          Register / Login
        </Link>
      </nav>

      {/* MAIN CARD */}
      <div className="flex justify-center items-center flex-1 px-6">
        <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden w-[85%] max-w-6xl">

          {/* LEFT SIDE */}
          <div className="w-1/2 bg-gradient-to-br from-[#0d1a3a] to-[#163b70] text-white p-12 flex flex-col justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-md">
              PA
            </div>

            <h2 className="text-3xl font-bold tracking-wide mb-8">ProAppoint</h2>

            <div className="space-y-4">
              <div className="flex items-center bg-white/10 px-5 py-3 rounded-xl shadow-sm">
                <span className="text-purple-300 text-xl mr-3">✔</span>
                <p>Easy appointment booking</p>
              </div>

              <div className="flex items-center bg-white/10 px-5 py-3 rounded-xl shadow-sm">
                <span className="text-purple-300 text-xl mr-3">✔</span>
                <p>View professionals & availability</p>
              </div>

              <div className="flex items-center bg-white/10 px-5 py-3 rounded-xl shadow-sm">
                <span className="text-purple-300 text-xl mr-3">✔</span>
                <p>Manage your bookings</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE LOGIN FORM */}
          <div className="w-1/2 p-12 flex flex-col justify-center">

            <h2 className="text-2xl font-semibold mb-6">Sign In</h2>

            {error && (
              <p className="text-red-500 mb-3 text-sm">{error}</p>
            )}

            <label className="text-gray-600 text-sm mb-1">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition shadow-md mb-3"
            >
              Sign In
            </button>

            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 font-medium hover:underline">
                Create Account
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
