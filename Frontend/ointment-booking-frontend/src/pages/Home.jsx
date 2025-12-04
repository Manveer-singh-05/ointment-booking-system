import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-20 flex justify-center items-center px-6">

      <div className="bg-white w-[90%] max-w-5xl rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center">

        {/* LEFT TEXT SECTION */}
        <div className="w-full md:w-1/2 p-6">

          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome{user && `, ${user.name}`} 👋
          </h1>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Book appointments with doctors, tutors, consultants and other professionals — 
            all in one place. Manage your schedule effortlessly with <b>ProAppoint</b>.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all text-lg font-semibold"
          >
            Start Booking
          </button>

        </div>

        {/* RIGHT IMAGE or ILLUSTRATION */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9079/9079529.png"
            alt="Appointment Illustration"
            className="w-64 md:w-80 drop-shadow-lg"
          />
        </div>

      </div>

    </div>
  );
}
