import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import AboutUs from "./pages/AboutUs";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import ProfessionalDetails from "./pages/ProfessionalDetails";




function AppLayout() {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarOn = ["/", "/signup"];

  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      {/* Show Navbar ONLY if logged in & not on login/signup */}
      {!shouldHideNavbar && isLoggedIn && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Pages */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/appointments" element={<Appointments />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/professional/:id" element={<ProfessionalDetails />} />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          }
        />
        <Route path="/book/:professionalId" element={<BookAppointment />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
