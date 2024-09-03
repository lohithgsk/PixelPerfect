// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import QuerySection from './components/QuerySection';
import ResultsSection from './components/ResultsSection';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css';
import axios from 'axios';

const App = () => {
  const [results, setResults] = useState([]);

  const handleQuery = async (query) => {
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setResults(response.data.results);
    } catch (error) {
      alert('Error fetching results.');
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <UploadSection />
              <QuerySection onQuery={handleQuery} />
              <ResultsSection results={results} />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
