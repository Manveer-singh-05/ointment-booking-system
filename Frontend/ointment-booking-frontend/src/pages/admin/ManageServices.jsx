import { useEffect, useState } from "react";
import axios from "axios";
import adminBg from "../../assets/images/manageservicef.jpg";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
    professionalId: ""
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Correct API base URL
  const API = "http://localhost:4000/admin/services";

  // Load all professionals
  const loadProfessionals = async () => {
    try {
      const res = await axios.get("http://localhost:4000/professionals");
      setProfessionals(res.data);
    } catch (err) {
      console.log("Error loading professionals:", err);
    }
  };

  // Load all services
  const loadServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/admin/services-all",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setServices(res.data);
    } catch (err) {
      console.log("Error loading services:", err);
    }
  };

  useEffect(() => {
    loadProfessionals();
    loadServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update service
  const saveService = async () => {
    if (!form.name || !form.duration || !form.price || !form.professionalId)
      return alert("All fields are required");

    const data = {
      name: form.name,
      duration: Number(form.duration),
      price: Number(form.price),
      professionalId: form.professionalId,
    };

    try {
      if (editingId) {
        // UPDATE
        await axios.put(
          `${API}/${editingId}`,
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
        );
      } else {
        // CREATE
        await axios.post(
          API,
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
        );
      }

      alert("Service saved!");

      setForm({ name: "", duration: "", price: "", professionalId: "" });
      setEditingId(null);

      loadServices();
    } catch (err) {
      console.log("Error saving service:", err);
      alert("Failed to save service.");
    }
  };

  const startEdit = (service) => {
    setEditingId(service._id);
    setForm({
      name: service.name,
      duration: service.duration,
      price: service.price,
      professionalId: service.professionalId?._id || "",
    });
  };

  const deleteService = async (sid) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`${API}/${sid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      loadServices();
    } catch (err) {
      console.log("Error deleting service:", err);
    }
  };

  return (
    <div
      className="min-h-screen pt-24 px-6 flex justify-center"
      style={{
        backgroundImage: `url(${adminBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="
          w-full max-w-5xl p-10 rounded-3xl bg-white/20 backdrop-blur-2xl
          border border-white/30 shadow-lg 
        "
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Manage Services</h2>

        {/* Form */}
        <div className="bg-white/50 p-6 rounded-2xl shadow-inner mb-10">
          <input
            name="name"
            placeholder="Service Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border mb-3"
          />

          <input
            name="duration"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border mb-3"
          />

          <input
            name="price"
            placeholder="Price (Rs)"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border mb-3"
          />

          <select
            name="professionalId"
            value={form.professionalId}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border mb-3"
          >
            <option value="">Select Professional</option>
            {professionals.map((pro) => (
              <option key={pro._id} value={pro._id}>
                {pro.name} — {pro.specialization}
              </option>
            ))}
          </select>

          <button
            onClick={saveService}
            className="w-full py-3 bg-blue-600 text-white rounded-xl shadow"
          >
            {editingId ? "Update Service" : "Add Service"}
          </button>
        </div>

        {/* Services List */}
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Existing Services
        </h3>

        <div className="space-y-4">
          {services.map((s) => (
            <div key={s._id}
              className="bg-white/40 p-5 rounded-xl shadow flex justify-between">
              <div>
                <p className="text-lg font-bold">{s.name}</p>
                <p>{s.duration} min — ₹{s.price}</p>
                <p className="text-sm">👨‍⚕️ {s.professionalId?.name}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => startEdit(s)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-xl">
                  Edit
                </button>
                <button onClick={() => deleteService(s._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl">
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
