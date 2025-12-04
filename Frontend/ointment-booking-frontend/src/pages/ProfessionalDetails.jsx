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

  if (!pro) return <p className="pt-24 text-center text-gray-600">Loading...</p>;

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
            className="w-40 h-40 rounded-full shadow-2xl object-cover"
          />

          <div>
            <h1 className="text-4xl font-bold text-gray-900">{pro.name}</h1>
            <p className="text-blue-700 text-xl font-medium mt-1">
              {pro.specialization}
            </p>

            {/* EXPERIENCE */}
            <p className="mt-1 text-gray-700">
              <b>Experience:</b> {pro.experience || "5+ years"}
            </p>

            {/* RATING */}
            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < (pro.rating || 4)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="mt-4 text-gray-700">{pro.description}</p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-b border-white/50 my-8"></div>

        {/* WORKING HOURS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Working Hours</h2>
          <div className="bg-white/40 p-4 rounded-xl shadow-inner">
            <p className="text-gray-800">Mon–Fri: 10 AM – 6 PM</p>
            <p className="text-gray-800">Sat: 10 AM – 2 PM</p>
            <p className="text-gray-800">Sun: Closed</p>
          </div>
        </div>

        {/* SERVICES SECTION */}
        {pro.services?.length > 0 && (
          <div className="mt-10">
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
                  <p className="text-sm text-gray-700 mt-1">
                    {service.description}
                  </p>
                  <p className="text-sm mt-1 font-medium text-blue-700">
                    Duration: {service.durationMinutes} minutes
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reviews</h2>

          <div className="space-y-4">
            <div className="bg-white/40 p-4 rounded-xl shadow">
              <p className="font-semibold">Amit Sharma</p>
              <p className="text-gray-600">
                ⭐⭐⭐⭐⭐ Great experience! Very professional and polite.
              </p>
            </div>

            <div className="bg-white/40 p-4 rounded-xl shadow">
              <p className="font-semibold">Priya Verma</p>
              <p className="text-gray-600">
                ⭐⭐⭐⭐ Helpful and knowledgeable. Recommended!
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT BUTTONS */}
        <div className="mt-10 flex gap-4">
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 transition">
            📞 Call
          </button>

          <button className="flex-1 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition">
            ✉ Email
          </button>
        </div>

        {/* BOOK BUTTON */}
        <button
          onClick={() => navigate(`/book/${pro._id}`)}
          className="
            mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl shadow-xl 
            hover:bg-indigo-700 hover:scale-[1.02] transition-all duration-300
          "
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
