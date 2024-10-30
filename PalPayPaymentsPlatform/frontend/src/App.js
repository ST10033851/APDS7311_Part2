import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import styles from './style';
import Hero from './components/Hero'
import About from './components/About'
import Create from './components/CRUD/Create';
import Read from './components/CRUD/Read';
import View from './components/CRUD/View';
import PrivateRoute from './components/PrivateRoute'
import {AuthProvider} from './components/AuthContext'

//Javascript Mastery - Build and Deploy a fully responsive website with modern UI/UX in React JS with Tailwind
//https://youtu.be/_oO4Qi5aVZs?si=hekjKfTG04zXcKBW

//Includes a Navbar, Hero and paths for the login, register , create and read pages
//The create and read paths will have protected routes disabling users from modifying the url to access restricted pages
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='bg-primary w-full overflow-hidden'>
          <div className={`${styles.paddingX} ${styles.flexCenter} fixed top-0 w-full z-[30]`}>
            <div className="xl:max-w-[1280px] w-full">
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

            <Route path="/view" element={
              <PrivateRoute>
                <View />
              </PrivateRoute>
            }/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
