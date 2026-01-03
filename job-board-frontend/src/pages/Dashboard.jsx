import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    api.get("/jobs").then((res) => {
      const mine = res.data.filter((j) => j.user_id === user.id);
      setJobs(mine);
    });
  }, [user]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard ({user?.role})</h1>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>
      <div className="space-y-4">
        {jobs.length ? (
          jobs.map((job) => (
            <div key={job.id} className="border p-3 rounded">
              <h2 className="font-semibold">{job.title}</h2>
              <p>{job.location}</p>
            </div>
          ))
        ) : (
          <p>No jobs yet.</p>
        )}
      </div>
    </div>
  );
}
