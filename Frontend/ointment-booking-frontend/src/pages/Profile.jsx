import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 flex justify-center px-4">

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl p-10">

        {/* PROFILE IMAGE + NAME + ROLE */}
        <div className="flex flex-col items-center">
          {/* PROFILE IMAGE */}
          <div className="relative">
            <img
              src={user?.photo || "https://cdn-icons-png.flaticon.com/512/848/848006.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />

            {/* Camera Icon */}
            <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition">
              📷
            </button>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            {user?.name || "User Name"}
          </h2>

          <p className="text-gray-600 text-lg mt-1">
            {user?.role || "Student"}
          </p>

          {/* Divider */}
          <div className="w-full border-b mt-6"></div>
        </div>

        {/* DETAILS GRID */}
        <div className="mt-8 bg-gray-50 rounded-xl p-8 shadow-inner">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

            {/* EMAIL */}
            <div>
              <p className="font-semibold text-gray-500">Email</p>
              <p className="mt-1">{user?.email || "Not Available"}</p>
            </div>

            {/* PHONE */}
            <div>
              <p className="font-semibold text-gray-500">Phone</p>
              <p className="mt-1">{user?.phone || "Not Added"}</p>
            </div>

            {/* BIO */}
            <div className="md:col-span-2">
              <p className="font-semibold text-gray-500">Bio</p>
              <p className="mt-1">
                {user?.bio || "No bio added yet. Add more info about yourself."}
              </p>
            </div>

            {/* LAST LOGIN */}
            <div>
              <p className="font-semibold text-gray-500">Last Login</p>
              <p className="mt-1">
                {user?.lastLogin || "Not recorded"}
              </p>
            </div>

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">

          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2">
            ✏ Edit Profile
          </button>

          <button className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50 transition flex items-center gap-2">
            🔐 Change Password
          </button>

          <Link
            to="/dashboard"
            className="px-6 py-3 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition flex items-center gap-2"
          >
            ← Back to Dashboard
          </Link>

        </div>

      </div>
    </div>
  );
}
