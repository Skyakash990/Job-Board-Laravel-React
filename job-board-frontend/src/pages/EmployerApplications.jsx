import { useEffect, useState } from "react";
import api from "../api/axios";

export default function EmployerApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/employer/applications").then((res) => setApplications(res.data));
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.put(`/applications/${id}/status`, { status });
    alert("Status updated");
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      <div className="grid gap-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-4 bg-white border rounded-lg shadow-sm"
          >
            <h2 className="font-semibold">{app.user.name}</h2>
            <p>{app.job.title}</p>
            <p>{app.cover_letter}</p>
            <p className="text-sm text-gray-600">
              Current status:{" "}
              <span className={`font-semibold capitalize ${app.status == 'hired'?'text-green-500': 'text-red-500'}`}>{app.status}</span>
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleStatusChange(app.id, "hired")}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Hire
              </button>
              <button
                onClick={() => handleStatusChange(app.id, "rejected")}
                className="bg-slate-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
              {app.resume && (
                <button
                  onClick={() =>
                    window.open(
                      `http://127.0.0.1:8000/storage/${app.resume}`,
                      "_blank"
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  View Resume
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
