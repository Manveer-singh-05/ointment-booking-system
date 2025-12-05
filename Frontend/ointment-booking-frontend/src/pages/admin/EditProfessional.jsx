import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditProfessional() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [professional, setProfessional] = useState(null);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    description: "",
    image: ""
  });

  // Fetch Professional Data
  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/professionals/${id}`);
        setProfessional(res.data);
        setForm({
          name: res.data.name,
          specialization: res.data.specialization,
          description: res.data.description || "",
          image: res.data.image || ""
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        alert("Failed to load professional");
      }
    };

    fetchProfessional();
  }, [id]);

  // Handle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit Update
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/admin/professionals/${id}`,
        form
      );

      alert("Professional updated!");
      navigate("/admin/manage-professionals");
    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  };

  // Delete Professional
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

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return (
    <div className="pt-24 flex justify-center px-4">
      <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-xl 
                      hover:shadow-2xl transition-all backdrop-blur-md">

        <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Professional</h2>

        {/* INPUTS */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleUpdate}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold 
                       hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
          >
            Save Changes
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold 
                       hover:bg-red-700 shadow-md hover:shadow-lg transition-all"
          >
            Delete Professional
          </button>
        </div>

        <button
          onClick={() => navigate("/admin/manage-professionals")}
          className="mt-6 w-full py-3 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
