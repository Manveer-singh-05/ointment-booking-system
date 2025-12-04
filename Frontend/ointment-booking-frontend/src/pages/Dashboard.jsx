import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [professionals, setProfessionals] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  // Fetch professionals
  useEffect(() => {
    fetch("http://localhost:4000/professionals")
      .then((res) => res.json())
      .then((data) => setProfessionals(data))
      .catch((err) => console.log(err));
  }, []);

  // Filter logic
  const filteredData = professionals.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? p.specialization === filter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-100">

      {/* SEARCH + FILTER */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search professionals..."
          className="w-full md:w-1/2 p-3 rounded-xl border bg-white/50 backdrop-blur-lg shadow-md focus:shadow-lg transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 rounded-xl border bg-white/50 backdrop-blur-lg shadow-md focus:shadow-lg transition"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Specializations</option>
          <option value="Dentist">Dentist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Physiotherapist">Physiotherapist</option>
        </select>
      </div>

      {/* PROFESSIONAL GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {filteredData.map((pro) => (
          <div
            key={pro._id}
            onClick={() => navigate(`/professional/${pro._id}`)}

            className="
              bg-white/30 backdrop-blur-xl border border-white/40
              p-6 rounded-3xl shadow-xl hover:shadow-[0_0_40px_rgba(0,0,0,0.2)]
              transition-all duration-500 float-animation
            "
          >
            <img
              src={pro.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              alt="Pro"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4 shadow-lg hover:scale-105 transition"
            />

            <h2 className="text-xl font-bold text-center text-gray-900">
              {pro.name}
            </h2>
            <p className="text-blue-700 text-center text-sm font-medium mt-1">
              {pro.specialization}
            </p>

            <p className="text-sm text-gray-600 mt-3 text-center leading-relaxed">
              {pro.description}
            </p>

            <button
              // onClick={() => navigate(`/book/${pro._id}`)}
               onClick={(e) => {
      e.stopPropagation(); // prevents card click from triggering
      navigate(`/book/${pro._id}`);
    }}
              className="
                mt-5 w-full bg-blue-600 text-white py-2 rounded-xl
                hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.98]
                transition-all duration-300 shadow-md
              "
            >
              Book Appointment
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
