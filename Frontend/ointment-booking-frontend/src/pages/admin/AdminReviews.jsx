import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/reviews");
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching reviews:", err);
    }
  };

  const deleteReview = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      console.log("Error deleting review:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white/30 backdrop-blur-2xl p-8 rounded-3xl shadow-xl float-animation">

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          ⭐ Manage Reviews
        </h1>

        {loading ? (
          <p className="text-lg text-center">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="bg-white/60 p-6 rounded-xl shadow hover:scale-[1.01] transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {r.professional?.name || "Unknown Professional"}
                </h2>

                {/* Rating Stars */}
                <p className="text-yellow-600 text-lg mt-1">
                  {"★".repeat(r.rating)}{" "}
                  <span className="text-gray-500">
                    {"☆".repeat(5 - r.rating)}
                  </span>
                </p>

                <p className="mt-2 text-gray-700">"{r.comment}"</p>

                <p className="text-sm mt-2 text-gray-500">
                  — {r.user?.name || "Anonymous"}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() => deleteReview(r._id)}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
                >
                  Delete Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
