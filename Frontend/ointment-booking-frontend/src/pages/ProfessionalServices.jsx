import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bgImage from "../assets/images/bookingservicef.jpg";

export default function ProfessionalServices() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pro, setPro] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/professionals/${id}`)
      .then((res) => res.json())
      .then((data) => setPro(data));

    fetch(`http://localhost:4000/services/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [id]);

  if (!pro) return <p className="pt-24 text-center">Loading...</p>;

  return (
    <div className="min-h-screen pt-24 px-6 flex justify-center"
       style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
    >
      <div className="w-full max-w-4xl p-8 bg-white/30 backdrop-blur-xl rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold mb-4">
          Services by {pro.name}
        </h1>

        {/* SERVICES LIST */}
        {services.length === 0 ? (
          <p className="text-gray-700">No services available.</p>
        ) : (
          <div className="space-y-4">
            {services.map((s) => (
              <div
                key={s._id}
                className="bg-white/40 p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-bold">{s.name}</p>
                  <p className="text-sm text-gray-700">
                    Duration: {s.duration} minutes
                  </p>
                  <p className="text-sm font-semibold text-green-700">
                    ₹ {s.price}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/book/${pro._id}?service=${s._id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full py-3 bg-gray-400 rounded-xl text-white hover:bg-gray-500"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
