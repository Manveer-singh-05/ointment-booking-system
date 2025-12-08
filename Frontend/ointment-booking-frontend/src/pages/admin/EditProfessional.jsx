import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import adminBg from "../../assets/images/admindashboard.jpg"; // background matching admin pages

export default function EditProfessional() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [professional, setProfessional] = useState(null);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    description: "",
    image: "",
  });

  // Fetch professional data
  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/professionals/${id}`
        );
        setProfessional(res.data);
        setForm({
          name: res.data.name,
          specialization: res.data.specialization,
          description: res.data.description || "",
          image: res.data.image || "",
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        alert("Failed to load professional");
      }
    };

    fetchProfessional();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/admin/professionals/${id}`, form);
      alert("Professional updated!");
      navigate("/admin/manage-professionals");
    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      await axios.delete(`http://localhost:4000/admin/professionals/${id}`);
      alert("Professional deleted.");
      navigate("/admin/manage-professionals");
    } catch (err) {
      console.log(err);
      alert("Delete failed!");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-xl text-white">Loading...</p>;

  return (
    <div
      className="min-h-screen pt-24 px-6 flex justify-center"
      style={{
        backgroundImage: `url(${adminBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* GLASS CONTAINER */}
      <div
        className="
          w-full max-w-4xl p-10 rounded-3xl
          bg-white/20 backdrop-blur-2xl border border-white/30
          shadow-[0_8px_40px_rgba(0,0,0,0.25)]
          float-animation transition-all duration-500
          hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
          max-h-fit
        "
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-900 drop-shadow">
          Edit Professional
        </h2>

        {/* FORM CARD */}
        <div
          className="
            bg-white/50 backdrop-blur-xl p-6 rounded-2xl shadow-inner
            border border-white/40 space-y-5
          "
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="
              w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
              shadow-sm focus:ring-2 focus:ring-blue-400 transition
            "
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
            className="
              w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
              shadow-sm focus:ring-2 focus:ring-blue-400 transition
            "
          />

          <textarea
            name="description"
            rows="3"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="
              w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
              shadow-sm focus:ring-2 focus:ring-blue-400 transition
            "
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="
              w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
              shadow-sm focus:ring-2 focus:ring-blue-400 transition
            "
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleUpdate}
            className="
              flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold
              hover:bg-blue-700 hover:scale-[1.03] active:scale-95
              shadow-md hover:shadow-blue-400/40 transition-all
            "
          >
            Save Changes
          </button>

          <button
            onClick={handleDelete}
            className="
              flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold
              hover:bg-red-700 hover:scale-[1.03] active:scale-95
              shadow-md hover:shadow-red-400/40 transition-all
            "
          >
            Delete Professional
          </button>
        </div>

        <button
          onClick={() => navigate("/admin/professionals")}
          className="
            mt-6 w-full py-3 rounded-xl bg-gray-300 backdrop-blur-sm
            hover:bg-gray-400 hover:scale-[1.02] active:scale-95 
            transition shadow
          "
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
