import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProfessionalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pro, setPro] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/professionals/${id}`)
      .then((res) => res.json())
      .then((data) => setPro(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!pro) {
    return (
      <p className="pt-24 text-center text-gray-600 text-lg">Loading...</p>
    );
  }

  return (
    <div
      className="min-h-screen pt-24 px-6 flex justify-center items-start"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526253433617-1b1a49a0a997?auto=format&fit=crop&q=80&w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* MAIN GLASS CARD */}
      <div
        className="
          w-full max-w-4xl bg-white/20 backdrop-blur-2xl rounded-3xl 
          border border-white/40 shadow-2xl p-10 mt-10 float-animation
        "
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={
              pro.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Professional"
            className="w-40 h-40 rounded-full object-cover shadow-xl"
          />

          <div>
            <h1 className="text-4xl font-bold text-gray-900">{pro.name}</h1>
            <p className="text-blue-700 text-xl font-medium mt-1">
              {pro.specialization}
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              {pro.description}
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-b border-white/50 my-8"></div>

        {/* SERVICES SECTION */}
        {pro.services?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Services Offered
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pro.services.map((service) => (
                <div
                  key={service._id}
                  className="
                    bg-white/30 p-4 rounded-xl shadow-md 
                    hover:shadow-lg hover:bg-white/40 transition-all
                  "
                >
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="text-sm text-gray-700 mt-1">{service.description}</p>
                  <p className="text-sm mt-1 font-medium text-blue-700">
                    Duration: {service.durationMinutes} minutes
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOK BUTTON */}
        <button
          onClick={() => navigate(`/book/${pro._id}`)}
          className="
            mt-10 w-full bg-blue-600 text-white py-3 rounded-xl shadow-xl 
            hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300
          "
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
