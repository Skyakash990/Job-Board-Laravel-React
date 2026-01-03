import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0">
      <Link to="/" className="text-xl font-bold text-yellow-500">
        JobBoard
      </Link>
      <div className="flex items-center gap-4">
        {user?.role === "candidate" && (
          <>
          <Link to="/" className="hover:text-yellow-500">Jobs</Link>
          <Link to="/applications" className="hover:text-yellow-500">Applied Jobs</Link>
          </>
        )}

        {user?.role === "employer" && (
          <>
          <Link to="/employer/jobs" className="hover:text-yellow-500">
            Jobs
          </Link>
          <Link to="/employer/applications" className="hover:text-yellow-500">
            Applications
          </Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="hover:text-yellow-500">Login</Link>
            <Link to="/register" className="hover:text-yellow-500">Register</Link>
          </>
        )}

        {user && (
          <>
            <span className="text-gray-600">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
