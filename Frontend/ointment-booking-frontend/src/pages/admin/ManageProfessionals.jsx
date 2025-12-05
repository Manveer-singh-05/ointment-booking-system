import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageProfessionals() {
  const navigate = useNavigate();
  const [pros, setPros] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/home");
      return;
    }

    fetch("http://localhost:4000/professionals")
      .then((res) => res.json())
      .then((data) => setPros(data))
      .catch((err) => console.log(err));
  }, []);

  const deletePro = async (id) => {
    if (!window.confirm("Are you sure you want to delete this professional?"))
      return;

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:4000/admin/professionals/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    setPros((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-100">
      <div
        className="max-w-5xl mx-auto bg-white/20 backdrop-blur-2xl rounded-3xl 
          p-10 border border-white/40 shadow-xl float-animation"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Professionals</h1>

          <button
            onClick={() => navigate("/admin/add-professional")}
            className="px-4 py-2 bg-blue-600 rounded-xl text-white
              hover:bg-blue-700 transition shadow-md hover:shadow-blue-400/40"
          >
            + Add Professional
          </button>
        </div>

        {/* Professionals List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pros.map((pro) => (
            <div
              key={pro._id}
              className="bg-white/40 p-6 rounded-2xl shadow-lg hover:scale-[1.02]
                transition-all border border-white/40"
            >
              <img
                src={pro.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                className="w-24 h-24 rounded-full mx-auto object-cover shadow"
                alt="pro"
              />

              <h2 className="text-xl text-center mt-3 font-semibold">{pro.name}</h2>
              <p className="text-center text-blue-700">{pro.specialization}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/admin/edit-professional/${pro._id}`)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePro(pro._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl"
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
