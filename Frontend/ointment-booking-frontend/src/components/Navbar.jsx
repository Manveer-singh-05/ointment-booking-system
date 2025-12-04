import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="w-full bg-[#0d1a3a] text-white px-10 py-4 shadow-md flex justify-between items-center">

      {/* LOGO */}
      <h1 className="text-2xl font-bold tracking-wide cursor-pointer" onClick={() => navigate("/home")}>
        ProAppoint
      </h1>

      {/* NAV LINKS */}
      <div className="flex items-center space-x-8 text-lg">

        <Link 
          to="/home" 
          className="hover:text-blue-300 transition duration-200"
        >
          Home
        </Link>

        <Link 
          to="/dashboard" 
          className="hover:text-blue-300 transition duration-200"
        >
          Dashboard
        </Link>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition shadow-md hover:shadow-red-400/40"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
