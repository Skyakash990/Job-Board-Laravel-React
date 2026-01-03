import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const EmployerEditJob = () => {
  const [form, setForm] = useState({
    description: "",
    company: "",
    title: "",
    location: "",
    type: "",
    salary: "",
    status: "",
  });
  const {jobId} = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchApplication = async () =>{
      try {
        const res = await api.get(`/jobs/${jobId}`);
        // console.log(res.data); 
        setForm(res.data);
      } catch (error) {
        
      }
    }
    fetchApplication();
  },[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form,[name]:value});
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/jobs/${jobId}`,form);
      alert(res.data.message);
      navigate('/employer/jobs');
    } catch (error) {
      alert('Failed to update');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Edit a Job
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Full-width Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-blue-500 md:col-span-2"
          rows={4}
          onChange={handleChange}
        />

        <input
          name="title"
          type="text"
          value={form.title}
          placeholder="Title"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          name="company"
          type="text"
          value={form.company}
          placeholder="Company"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          name="location"
          type="text"
          value={form.location}
          placeholder="Location"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <select
          name="type"
          value={form.type}
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
          value={form.salary}
          type="number"
          placeholder="Salary"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          name="status"
          value={form.status}
          type="text"
          placeholder="Status"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        {/* Full-width Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 bg-slate-500 text-white p-3 rounded-lg hover:bg-slate-600 transition-colors md:col-span-2"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EmployerEditJob;
