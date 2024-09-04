// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadSection from "./components/UploadSection";
import QuerySection from "./components/QuerySection";
import ResultsSection from "./components/ResultsSection";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./index.css";
import axios from "axios";
import UploadPage from "./pages/UploadPage";
import ImageGeneration from "./pages/ImageGeneration";

const App = () => {
  const [results, setResults] = useState([]);

  const handleQuery = async (query) => {
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setResults(response.data.results);
    } catch (error) {
      alert("Error fetching results.");
    }
  };

  return (
    <Router>
      <div className="App">
        {location.pathname !== "/login" && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <QuerySection onQuery={handleQuery} />
                <ResultsSection results={results} />
              </>
            }
          />
          <Route path="/upload" element={<UploadPage />}></Route>
          <Route path="/generate-image" element={<ImageGeneration />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
