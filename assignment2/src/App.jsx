
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
        </Routes>
      </div>
    </Router>
  );
}

export default App;