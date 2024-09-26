import './App.css';
import React from 'react';
import Login from './components/auth/Login';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
