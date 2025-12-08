import { useEffect, useState } from "react";
import axios from "axios";
import adminBg from "../../assets/images/admindashboard.jpg";

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

  const API = "http://localhost:4000/api/admin";

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
      const res = await axios.get(`${API}/services-all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
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

  const saveService = async () => {
    if (!form.name || !form.duration || !form.price || !form.professionalId)
      return alert("All fields are required");

    try {
      if (editingId) {
        await axios.put(
          `${API}/services/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      } else {
        await axios.post(
          `${API}/services`,
          form,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      }

      setForm({ name: "", duration: "", price: "", professionalId: "" });
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
      price: service.price,
      professionalId: service.professionalId?._id || ""
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
    <div
      className="min-h-screen pt-24 px-6 flex justify-center"
      style={{
        backgroundImage: `url(${adminBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* GLASS CARD CONTAINER */}
      <div
        className="
          w-full max-w-5xl p-10 rounded-3xl
          bg-white/20 backdrop-blur-2xl border border-white/30
          shadow-[0_8px_40px_rgba(0,0,0,0.25)]
          float-animation transition-all duration-500
          hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
          max-h-fit 
        "
      >

        <h2 className="text-3xl font-bold mb-8 text-gray-900 drop-shadow">
          Manage Services
        </h2>

        {/* FORM CARD */}
        <div  
          className="
            space-y-4 bg-white/50 backdrop-blur-xl p-6 rounded-2xl
            shadow-inner border border-white/40 mb-10 
          "
        >
          <div className="space-y-4">

            <input
              name="name"
              placeholder="Service Name"
              value={form.name}
              onChange={handleChange}
              className="
                w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
              "
            />

            <input
              name="duration"
              placeholder="Duration (minutes)"
              value={form.duration}
              onChange={handleChange}
              className="
                w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
              "
            />

            <input
              name="price"
              placeholder="Price (Rs)"
              value={form.price}
              onChange={handleChange}
              className="
                w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
              "
            />

            {/* PROFESSIONAL DROPDOWN */}
            <select
              name="professionalId"
              value={form.professionalId}
              onChange={handleChange}
              className="
                w-full p-3 rounded-xl border bg-white/70 backdrop-blur-sm
              "
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
              className="
                w-full py-3 bg-blue-600 text-white rounded-xl
                hover:bg-blue-700 hover:scale-[1.03] active:scale-95
                transition-all shadow-lg
              "
            >
              {editingId ? "Update Service" : "Add Service"}
            </button>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-900">Existing Services</h3>

        {/* SERVICES LIST */}
        <div className="space-y-4">
          {services.map((s) => (
            <div
              key={s._id}
              className="
                bg-white/40 backdrop-blur-xl p-5 rounded-2xl shadow
                border border-white/40 flex justify-between items-center
                hover:scale-[1.02] transition-all
              "
            >
              <div>
                <p className="text-lg font-bold text-gray-900">{s.name}</p>

                <p className="text-gray-700">
                  {s.durationMinutes} min — ₹{s.price}
                </p>

                <p className="text-gray-600 text-sm">
                  👨‍⚕️ {s.professionalId?.name || "Unknown Professional"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(s)}
                  className="
                    px-4 py-2 bg-yellow-500 text-white rounded-xl 
                    hover:bg-yellow-600 hover:scale-[1.04] active:scale-95 
                    transition-all
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteService(s._id)}
                  className="
                    px-4 py-2 bg-red-600 text-white rounded-xl 
                    hover:bg-red-700 hover:scale-[1.04] active:scale-95 
                    transition-all
                  "
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
