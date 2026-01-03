import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form,setForm] = useState({
        name:"",
        email:"",
        password:"",
        password_confirmation:"",
        role:"candidate"
    });
    const{ register }= useAuth();
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]:value,
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await register(form);
        navigate("/");
    }

  return (
    <div className="flex justify-center items-center h-[500px] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80 space-y-3"
      >
        <h2 className="text-xl font-semibold text-center">Register</h2>
        <input
          className="border p-2 w-full rounded"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full rounded"
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full rounded"
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full rounded"
          name="password_confirmation"
          placeholder="Confirm Password"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
        />
        <select
          name="role"
          className="border p-2 w-full rounded"
          value={form.role}
          onChange={handleChange}
        >
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>
        <button className="bg-green-500 text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register