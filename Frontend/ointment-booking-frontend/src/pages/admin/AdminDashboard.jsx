import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function AdminDashboard() {
     const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/home"); // redirect non-admins
    }
  }, []);
  return (
    <div
      className="min-h-screen pt-24 px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526253433617-1b1a49a0a997?auto=format&fit=crop&q=80&w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="
          max-w-4xl mx-auto bg-white/20 backdrop-blur-2xl rounded-3xl 
          border border-white/40 shadow-2xl p-10 float-animation
        "
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        {/* ADMIN MENU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Link
            to="/admin/professionals"
            className="
              bg-white/40 p-6 rounded-xl shadow-lg hover:scale-[1.03] 
              transition-all text-center font-semibold text-gray-800
            "
          >
            Manage Professionals
          </Link>

          <Link
            to="to={`/admin/services/${pro._id}`}"
            className="
              bg-white/40 p-6 rounded-xl shadow-lg hover:scale-[1.03] 
              transition-all text-center font-semibold text-gray-800
            "
          >
            Manage Services
          </Link>

          <Link
            to="/admin/bookings"
            className="
              bg-white/40 p-6 rounded-xl shadow-lg hover:scale-[1.03] 
              transition-all text-center font-semibold text-gray-800
            "
          >
            View All Bookings
          </Link>

          <Link
            to="/admin/reviews"
            className="
              bg-white/40 p-6 rounded-xl shadow-lg hover:scale-[1.03] 
              transition-all text-center font-semibold text-gray-800
            "
          >
            Manage Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}
