import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {user?.role === "candidate" ? "Available Jobs" : "Other Jobs"}
      </h1>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg">{job.title}</h2>
              <p className={job.status == 'open'? 'text-green-500':'text-red-500'}>{job.status == 'open'?"Actively Hiring":"Closed"}</p>
            </div>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-500 text-sm">{job.type}</p>
            <p className="mt-2">{job.description}</p>

            {user?.role === "candidate" && (
              <button
                onClick={() => navigate(`/jobs/${job.id}/apply`)}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
