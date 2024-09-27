// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import styles from './style';
import Hero from './components/Hero'
import About from './components/About'

function App() {
  return (
    <Router>
      <div className='bg-primary w-full overflow-hidden'>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className='xl:max-w-[1280px] w-full'>
            <Navbar />
          </div>
        </div>

        <div className='bg-primary flex justify-center items-start'>
          <div className='xl:max-w-[1280px] w-full'>
            <Hero />
          </div>
        </div>

        <div className='sm:px-16 px-6 bg-primary flex justify-center items-start'>
          <div className='xl:max-w-[1280px] w-full'>
            <About />
          </div>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
