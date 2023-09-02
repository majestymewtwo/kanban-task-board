import React, { useContext, useState } from "react";
import {Link} from 'react-router-dom';
import { UserContext } from "../context/UserContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/client/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      setEmail("");
      setPassword("");
      const token = data.token;
      localStorage.setItem('token',token);
      context.setLoggedIn(true);
    } else alert(data.error);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-tr from-cyan-600 to-cyan-300'>
      <div className='w-[80%] md:w-[65%] lg:w-1/4 p-6 shadow-2xl rounded-lg space-y-5 bg-white'>
        <div>
          <h1 className='font-black text-2xl tracking-wide'>Kanban Board</h1>
          <p className='font-light tracking-wider text-sm'>
            Task management now made easier!
          </p>
        </div>
        <form onSubmit={loginUser} className="space-y-5">
          <div className='space-y-2'>
            <input
              variant='bordered'
              type='email'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              className='focus:outline-none border border-gray-300 w-full rounded-md p-3'
            />
            <input
              variant='bordered'
              type='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              className='focus:outline-none border border-gray-300 w-full rounded-md p-3'
            />
          </div>
          <div className='text-xs text-right text-gray-400'>
            <Link to='/register' className='hover:text-gray-600'>
              New here? Register here
            </Link>
          </div>
          <button type="submit" className='w-full bg-cyan-500 text-white focus:outline-none rounded-md px-3 py-1'>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};
