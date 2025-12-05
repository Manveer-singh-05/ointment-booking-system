import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      console.log("BOOKINGS RECEIVED:", res.data);
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
      await axios.put(
        `http://localhost:4000/admin/bookings/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      fetchBookings();
    } catch (err) {
      console.log("Status update error:", err);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-100">
      <div
        className="
          max-w-5xl mx-auto p-10 rounded-3xl shadow-2xl
          bg-white/30 backdrop-blur-2xl border border-white/40 float-animation
        "
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-900 flex items-center gap-2">
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
                className="
                  bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg 
                  hover:scale-[1.02] transition-all border border-white/30
                "
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  {b.professional || "Unknown Professional"}
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

                <div className="mt-4">
                  <label className="font-semibold text-gray-700 mr-2">
                    Status:
                  </label>

                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                    className="
                      px-4 py-2 rounded-lg border shadow bg-white/70 
                      hover:bg-white transition
                    "
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
