// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { close, menu, logo } from '../assets'

function Navbar() {
  const [toggle, setToggle] = useState(false)
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar z-[30]">
      <img src={logo} alt = "name" className='w-[170px] h-[50px]'/>
      <ul className="list-none sm:flex hidden justify-end item-center flex-1">
        <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}>
          <Link to="/" className='hover:text-blue-500 transition-all duration-300'>Home</Link>
        </li>
        <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}>
          <a href="/login">Login</a>
        </li>
        <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}>
          <Link to="/register">Register</Link>
        </li>
        <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}>
          <Link to="/create">Create</Link>
        </li>
        <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-0`}>
          <Link to="/read">Read</Link>
        </li>
      </ul>
      
      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img src={toggle ? close : menu } alt='menu' className='w-[28px] h-[28px] object-contain' onClick={() => setToggle((prev) => !prev)}/>

        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>

          <ul className="list-none flex justify-end item-center flex-1 flex-col">
            <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}>
              <Link to="/login">Login</Link>
            </li>
            <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}>
              <Link to="/register">Register</Link>
            </li>
            <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}>
              <Link to="/create">Create</Link>
            </li>
            <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-0`}>
              <Link to="/read">Read</Link>
            </li>
          
        </ul>
        </div>
      </div>
      
    </nav>
  );
}
export default Navbar;
