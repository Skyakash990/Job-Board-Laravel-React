import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function JobApply() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cover_letter: "",
    location: "",
    expected_salary: "",
    availability: "",
  });
  const [resume, setResume] = useState(null);
  const [jobData, setJobData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const res = await api.get(`/jobs/${jobId}`);
        // console.log(res);
        setJobData(res.data);
      } catch (error) {
        alert(res.data.message);
      }
    };
    getJobDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (resume) data.append("resume", resume);

    try {
      const res = await api.post(`/jobs/${jobId}/apply`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      navigate("/applications");
    } catch (err) {
      if (err.response?.status === 409) {
        alert("You have already applied for this job.");
      } else {
        alert("Failed to apply. Try again later.");
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="max-w-xl bg-white  shadow p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Job Details
          </h2>

          <div className="space-y-3">
            <div>
              <p className="text-gray-500 text-sm">Job Title</p>
              <p className="text-lg font-semibold text-gray-800">
                {jobData.title}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Company</p>
              <p className="text-gray-700">{jobData.company}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="text-gray-700">{jobData.location}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Job Type</p>
              <p className="text-gray-700">{jobData.type}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Salary Range</p>
              <p className="text-gray-700">{jobData.salary}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Description</p>
              <p className="text-gray-700 leading-relaxed">
                {jobData.description}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Posted On</p>
              <p className="text-gray-700">
                {" "}
                {new Date(jobData.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-xl  mt-8 bg-white p-6  shadow">
          <h2 className="text-xl font-semibold mb-4">Apply for Job</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              name="cover_letter"
              placeholder="Cover Letter"
              className="border w-full p-2 rounded"
              rows="4"
              value={form.cover_letter}
              onChange={handleChange}
            />

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="border w-full p-2 rounded"
            />

            <input
              type="text"
              name="location"
              placeholder="Your Location"
              className="border w-full p-2 rounded"
              value={form.location}
              onChange={handleChange}
            />

            <input
              type="number"
              name="expected_salary"
              placeholder="Expected Salary"
              className="border w-full p-2 rounded"
              value={form.expected_salary}
              onChange={handleChange}
            />

            <input
              type="text"
              name="availability"
              placeholder="Availability (e.g. Immediate)"
              className="border w-full p-2 rounded"
              value={form.availability}
              onChange={handleChange}
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
