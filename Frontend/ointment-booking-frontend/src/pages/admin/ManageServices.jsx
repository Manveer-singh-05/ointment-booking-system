import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageServices() {
  const { id } = useParams(); // professional ID
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", durationMinutes: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch services of this professional
  const loadServices = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/professionals/${id}/services`
      );
      setServices(res.data);
    } catch (err) {
      console.log("Service fetch error:", err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update service
  const saveService = async () => {
    if (!form.name || !form.durationMinutes || !form.price) {
      return alert("Please fill all fields");
    }

    try {
      if (editingId) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/admin/services/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Service updated!");
      } else {
        // ADD new service
        await axios.post(
          `http://localhost:5000/api/admin/professionals/${id}/services`,
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Service added!");
      }

      setForm({ name: "", durationMinutes: "", price: "" });
      setEditingId(null);
      loadServices();
    } catch (err) {
      console.log("Save service error:", err);
    }
  };

  // Edit service
  const startEdit = (service) => {
    setEditingId(service._id);
    setForm({
      name: service.name,
      durationMinutes: service.durationMinutes,
      price: service.price,
    });
  };

  // Delete service
  const deleteService = async (sid) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/services/${sid}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      loadServices();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="pt-24 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition">

        <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Services</h2>

        {/* Add / Edit Form */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-xl shadow-inner mb-8">
          <input
            name="name"
            placeholder="Service Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
          />

          <input
            name="durationMinutes"
            placeholder="Duration (minutes)"
            value={form.durationMinutes}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
          />

          <input
            name="price"
            placeholder="Price (Rs)"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
          />

          <button
            onClick={saveService}
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            {editingId ? "Update Service" : "Add Service"}
          </button>
        </div>

        {/* SERVICE LIST */}
        <h3 className="text-xl font-semibold mb-4">Existing Services</h3>

        <div className="space-y-4">
          {services.map((s) => (
            <div
              key={s._id}
              className="p-4 bg-gray-100 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{s.name}</p>
                <p className="text-gray-600">
                  {s.durationMinutes} min — ₹{s.price}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(s)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteService(s._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/admin/professionals")}
          className="mt-8 w-full py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
