import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const EditApplication = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cover_letter: "",
    location: "",
    expected_salary: "",
    availability: "",
  });
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await api.get(`/applications/${applicationId}`);
        console.log("Logged in users application for edit:", res.data);
        const app = res.data;
        // const foundApp = res.data.find((a) => a.id === parseInt(applicationId));
        if (app.resume) {
            setResume(app.resume);
          }
        if (app) {
          setForm({
            cover_letter: app.cover_letter || "",
            location: app.location || "",
            expected_salary: app.expected_salary || "",
            availability: app.availability || "",
          });
        } else {
          console.warn("No application found with this ID");
        }
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchApplication();
  }, [applicationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...setForm, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (resume) data.append("resume", resume);

    try {
      const res = await api.put(`/applications/${applicationId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      navigate("/applications");
    } catch (error) {
      alert("Failed to update");
    }
  };

  return (
    <div className="max-w-xl grid grid-cols-1 mx-auto mt-8 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Application</h2>
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
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="border w-full p-2 rounded"
        />
        {resume && (
          <button
            onClick={() =>
              window.open(resume,"_blank")
            }
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            View Resume
          </button>
        )}
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
          placeholder="Availability"
          className="border w-full p-2 rounded"
          value={form.availability}
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Update Application
        </button>
      </form>
    </div>
  );
};

export default EditApplication;
