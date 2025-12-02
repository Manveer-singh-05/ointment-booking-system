import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      padding: "12px",
      background: "#222",
      color: "white"
    }}>
      <Link to="/home" style={{ marginRight: 20, color: "white" }}>Home</Link>
      <Link to="/dashboard" style={{ marginRight: 20, color: "white" }}>Dashboard</Link>
      <Link to="/" style={{ color: "white" }}>Logout</Link>
    </nav>
  );
}

export default Navbar;
