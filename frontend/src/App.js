// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Create from './components/CRUD/Create';
import Read from './components/CRUD/Read';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/create' element={<Create />}></Route>
          <Route path='/read' element={<Read />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
