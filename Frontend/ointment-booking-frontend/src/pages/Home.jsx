import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome to our website</h1>

      <button 
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "20px" }}
      >
        Start Appointment
      </button>
    </div>
  );
}

export default Home;
