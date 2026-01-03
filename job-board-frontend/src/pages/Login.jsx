import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };


  return (
    <div className='flex justify-center items-center h-[500px] bg-grey-100'>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-2xl shadow-md w-80 space-y-3'>
            <h2 className='text-xl font-semibold text-center'>Login</h2>
            <input 
                type="email" 
                className='border p-2 w-full rounded'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Email'
            />
            <input 
                type="password" 
                className='border p-2 w-full rounded'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Password'
            />
              <button className="bg-green-500 text-white w-full py-2 rounded">
          Login
        </button>
        </form>
    </div>
  )
}

export default Login