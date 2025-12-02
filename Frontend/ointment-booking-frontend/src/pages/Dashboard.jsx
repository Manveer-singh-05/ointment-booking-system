import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/professionals")
      .then(res => setProfessionals(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Available Appointments</h2>

      {professionals.length === 0 ? (
        <p>No professionals found</p>
      ) : (
        professionals.map(pro => (
          <div key={pro._id} style={{
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc"
          }}>
            <b>{pro.name}</b> — {pro.specialization}
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
