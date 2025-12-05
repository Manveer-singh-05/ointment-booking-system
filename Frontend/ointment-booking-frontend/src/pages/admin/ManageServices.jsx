import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ManageServices() {
  const { id } = useParams(); // professional ID

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", duration: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:4000/api/admin";

  // Load services
  const loadServices = async () => {
    try {
      const res = await axios.get(`${API}/services/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      setServices(res.data);
    } catch (err) {
      console.log("Error loading services:", err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveService = async () => {
    if (!form.name || !form.duration || !form.price)
      return alert("All fields are required");

    try {
      if (editingId) {
        // UPDATE
        await axios.put(
          `${API}/services/${editingId}`,
          {
            name: form.name,
            duration: form.duration,
            price: form.price
          },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      } else {
        // ADD NEW
        await axios.post(
          `${API}/services`,
          {
            professionalId: id,
            name: form.name,
            duration: form.duration,
            price: form.price
          },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      }

      setForm({ name: "", duration: "", price: "" });
      setEditingId(null);
      loadServices();
    } catch (err) {
      console.log("Error saving service:", err);
    }
  };

  const startEdit = (service) => {
    setEditingId(service._id);
    setForm({
      name: service.name,
      duration: service.durationMinutes,
      price: service.price
    });
  };

  const deleteService = async (sid) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`${API}/services/${sid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      loadServices();
    } catch (err) {
      console.log("Error deleting service:", err);
    }
  };

  return (
    <div className="pt-24 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white/40 backdrop-blur-xl p-10 rounded-3xl shadow-xl">

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
            name="duration"
            placeholder="Duration (minutes)"
            value={form.duration}
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
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            {editingId ? "Update Service" : "Add Service"}
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-4">Existing Services</h3>

        <div className="space-y-4">
          {services.map((s) => (
            <div key={s._id} className="p-4 bg-gray-100 rounded-xl shadow flex justify-between">
              <div>
                <p className="text-lg font-semibold">{s.name}</p>
                <p className="text-gray-600">
                  {s.durationMinutes} min — ₹{s.price}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(s)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteService(s._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
