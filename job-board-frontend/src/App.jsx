import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import Dashboard from "./pages/Dashboard";
import JobApply from "./pages/JobApply";
import UserApplications from "./pages/UserApplications";
import api from "./api/axios";
import EmployerApplications from "./pages/EmployerApplications";
import EmployerPosted from "./pages/EmployerPosted";
import EmployerCreateJob from "./pages/EmployerCreateJob";
import EditApplication from "./pages/EditApplication";
import EmployerEditJob from "./pages/EmployerEditJob";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  if(user.role != 'employer') return <Navigate to="/" />
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="max-w-5xl mx-auto mt-6">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/jobs/:jobId/apply" element={<JobApply />} />
            <Route path="/applications" element={<UserApplications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/applications/:applicationId" element={<EditApplication/>}/>
            <Route
              path="/employer/applications"
              element={
                <ProtectedRoute>
                  <EmployerApplications />
                </ProtectedRoute>
              }
            />
            <Route path="/employer/jobs" element={<ProtectedRoute><EmployerPosted /></ProtectedRoute>}/>
            <Route path="/employer/:jobId" element={<ProtectedRoute><EmployerEditJob /></ProtectedRoute>}/>
            <Route path="/employer/create" element={<ProtectedRoute><EmployerCreateJob /></ProtectedRoute>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
