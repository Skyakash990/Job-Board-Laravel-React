import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import WithdrawButton from "./WithdrawButton";
const UserApplications = () => {
  const [application, setApplication] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/applications").then((res) => setApplication(res.data));
  }, []);
  console.log(application);
  
  const removeApplication = (appId) => {
  setApplication((prev) => prev.filter((app) => app.id !== appId));
};

  return (
    <div className="grid bottom-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {application.map((app) => (
        <div
          key={app.id}
          className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
        >
          <h2 className="text-lg font-bold text-gray-800">{app.job.title}</h2>
          <p className="text-gray-600 mt-1">{app.job.location}</p>
          <p className="text-gray-600 mt-1">{app.job.company}</p>
          <p className="text-gray-500 text-sm mt-1">{app.job.type}</p>

          {app.cover_letter && (
            <p className="text-gray-700 mt-3">
              <span className="font-semibold">Cover Letter:</span>{" "}
              {app.cover_letter}
            </p>
          )}

          {app.resume && (
            <p className="mt-2">
              <span className="font-semibold">Resume:</span>{" "}
              <a
                href={`http://127.0.0.1:8000/storage/${app.resume}`}
                target="_blank"
                className="text-blue-500 underline"
              >
                View
              </a>
            </p>
          )}

          <p className="mt-2 text-gray-600">
            <span className="font-semibold">Expected Salary:</span> &#8377;
            {app.expected_salary || "N/A"}
          </p>

          <p className="mt-2 text-gray-600">
            <span className="font-semibold">Availability:</span>{" "}
            {app.availability || "N/A"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Applied on: {new Date(app.created_at).toLocaleDateString()}
          </p>
          <div className="flex">
            <button
              onClick={() => navigate(`/applications/${app.id}`)}
              className="mt-5 bg-neutral-400 text-white px-4 py-2 rounded hover:bg-neutral-500 transition"
            >
              Edit
            </button>
            <WithdrawButton applicationId={app.id} onWithdraw={removeApplication} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserApplications;
