import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function EmployerPosted() {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  const [loadingIds, setLoadingIds] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/employer/jobs").then((res) => setJobs(res.data));
  }, []);

 const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      setLoadingIds((prev) => [...prev, jobId]);

      const response = await api.delete(`/jobs/${jobId}`, {
        withCredentials: true, 
      });

      if (response.status === 200) {
        setJobs((prev) => prev.filter((job) => job.id !== jobId));
        // alert("Job deleted successfully!");
      }
    } catch (error) {
      console.error("Delete error:", error);
      const msg =
        error.response?.data?.message || "Something went wrong. Please try again.";
      alert(msg);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== jobId));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between pb-2">
        <h1 className="text-2xl font-bold mb-4">Active Jobs</h1>
        <button
          onClick={() => navigate("/employer/create")}
          className="px-4 bg-blue-500 select-none rounded text-white"
        >
          Create Job
        </button>
      </div>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg">{job.title}</h2>
              <p
                className={
                  job.status == "open" ? "text-green-500" : "text-red-500"
                }
              >
                {job.status == "open" ? "Active" : "Closed"}
              </p>
            </div>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-500 text-sm">{job.type}</p>
            <p className="mt-2">{job.description}</p>

            {user?.role === "employer" && (
              <div className="grid mt-4 bottom-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-2">
                <button
                  onClick={() => navigate(`/employer/${job.id}`)}
                  className=" bg-cyan-500 text-white px-4 py-2 p-3 rounded hover:bg-cyan-600"
                >
                  Edit
                </button>
                 <button
                  onClick={() => handleDelete(job.id)}
                  disabled={loadingIds.includes(job.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                >
                  {loadingIds.includes(job.id) ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
