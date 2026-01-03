import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const EmployerCreateJob = () => {
    const [create, setCreate] = useState({
        description: "",
        title: "",
        company: "",
        location: "",
        type: "",
        salary: "",
        status: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setCreate({ ...create, [name]: value });
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", create);
    try {
      const res = await api.post("/jobs", create);
      alert(res.data.message);
      setCreate({
        description: "",
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        salary: "",
        status: "",
      });
      navigate("/employer/jobs")
    } catch (error) {
      console.error("API Error:", error.response || error.message);
      if (error.response?.status === 409) {
        alert("Job Already Exists!");
      } else {
        alert("Failed to post job.");
      }
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Post a Job
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Full-width Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={create.description}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-blue-500 md:col-span-2"
          rows={4}
          onChange={handleChange}
        />

        <input
          name="title"
          type="text"
          value={create.title}
          placeholder="Title"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          name="company"
          type="text"
          value={create.company}
          placeholder="Company"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          name="location"
          type="text"
          value={create.location}
          placeholder="Location"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <select
          name="type"
          value={create.type}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        >
          <option value="Full-time">Full-time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
        </select>

        <input
          name="salary"
          value={create.salary}
          type="number"
          placeholder="Salary"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          name="status"
          value={create.status}
          type="text"
          placeholder="Status"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        {/* Full-width Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors md:col-span-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployerCreateJob;
