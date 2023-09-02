import React, { useContext } from 'react'
import {UserContext} from '../context/UserContext';
import { getName } from '../utils/JwtUtils';

export const Navbar = () => {
    const context = useContext(UserContext);
    const logOut = () => {
        localStorage.removeItem('token');
        context.setLoggedIn(false);
    }
  return (
    <div className='flex items-center justify-between bg-cyan-500 text-white p-6'>
      <h1 className='font-black text-2xl'>Kanban Board</h1>
      <div className='flex space-x-4 items-center'>
        <p className='tracking-wide'>
          {getName(localStorage.getItem("token"))}
        </p>
        <button onClick={logOut}>Logout</button>
      </div>
    </div>
  );
}
