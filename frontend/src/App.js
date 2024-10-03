import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import styles from './style';
import Hero from './components/Hero'
import About from './components/About'
import Create from './components/crud/Create';
import Read from './components/crud/Read';
import PrivateRoute from './components/PrivateRoute'
import {AuthProvider} from './components/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='bg-primary w-full overflow-hidden'>
          <div className={`${styles.paddingX} ${styles.flexCenter} z-[30]`}>
            <div className='xl:max-w-[1280px] w-full z-[30]'>
              <Navbar />
            </div>
          </div>

          <Routes>
            <Route path="/" element={
              <>
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
              </>
            } />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/create" element={
              <PrivateRoute>
                <Create />
              </PrivateRoute>
            }/>
            
            <Route path="/read" element={
              <PrivateRoute>
                <Read />
              </PrivateRoute>
            }/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
