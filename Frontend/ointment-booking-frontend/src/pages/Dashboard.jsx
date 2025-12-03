import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:4000/professionals")
      .then(res => setProfessionals(res.data || []))
      .catch(err => {
        console.error(err);
        alert("Failed to load professionals");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Available Appointments</h2>

      {professionals.length === 0 ? (
        <p>No professionals found</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 20
        }}>
          {professionals.map(pro => (
            <div key={pro._id} style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
            }}>
              <h3 style={{ margin: 0 }}>{pro.name}</h3>
              <p style={{ margin: "6px 0 10px", color: "#666" }}>{pro.specialization}</p>
              <p style={{ marginTop: 8 }}>{pro.description}</p>

              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button onClick={() => {
                  // navigate to professional detail / slots page (we'll add route)
                  localStorage.setItem("selectedProfessional", JSON.stringify(pro));
                  window.location.href = "/dashboard/slots"; // simple approach
                }}>
                  View Slots
                </button>

                <button onClick={() => {
                  // quick one-click booking demo (we'll replace later)
                  alert("We'll implement booking next. Click View Slots to continue.");
                }}>
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
