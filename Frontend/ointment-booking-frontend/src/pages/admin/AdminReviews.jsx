import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/reviews", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      console.log("REVIEWS RECEIVED:", res.data);
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching reviews:", err);
    }
  };

  const deleteReview = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:4000/admin/reviews/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

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
      <div
        className="
        max-w-4xl mx-auto p-10 rounded-3xl shadow-2xl
        bg-white/20 backdrop-blur-2xl border border-white/40 float-animation
      "
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-900 flex items-center gap-2">
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
                className="
                bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg 
                hover:scale-[1.02] transition-all border border-white/30
              "
              >
                {/* Professional */}
                <h2 className="text-xl font-semibold text-gray-800">
                  {r.professionalId?.name || "Unknown Professional"}
                </h2>

                {/* Rating Stars */}
                <p className="text-yellow-600 text-xl mt-1">
                  {"★".repeat(r.rating)}
                  <span className="text-gray-400 ml-1">
                    {"☆".repeat(5 - r.rating)}
                  </span>
                </p>

                {/* Review Text */}
                <p className="mt-3 text-gray-700 italic">"{r.comment}"</p>

                {/* Reviewer */}
                <p className="text-sm mt-2 text-gray-500">
                  — {r.userId?.name || "Anonymous"}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() => deleteReview(r._id)}
                  className="
                  mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 
                  text-white rounded-lg shadow transition
                "
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
