import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/bookings");
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/bookings/${id}`, {
        status,
      });
      fetchBookings();
    } catch (err) {
      console.log("Status update error:", err);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white/30 backdrop-blur-2xl p-8 rounded-3xl shadow-xl float-animation">

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          📅 All Bookings
        </h1>

        {loading ? (
          <p className="text-lg text-center">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white/60 p-6 rounded-xl shadow hover:scale-[1.01] transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {b.professional?.name || "Unknown Professional"}
                </h2>

                <p className="text-gray-600 mt-1">
                  👤 <b>{b.clientName}</b> — {b.clientEmail}
                </p>

                <p className="mt-1 text-gray-600">
                  🗓️ {b.date} | ⏰ {b.time}
                </p>

                {b.notes && (
                  <p className="mt-1 text-gray-700">📝 Notes: {b.notes}</p>
                )}

                {/* Status dropdown */}
                <div className="mt-4">
                  <label className="font-semibold text-gray-700 mr-2">
                    Status:
                  </label>

                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                    className="px-4 py-2 rounded-lg border shadow"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
