import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import QuerySection from "./components/QuerySection";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./index.css";
import axios from "axios";
import UploadPage from "./pages/UploadPage";
import ImageGeneration from "./pages/ImageGeneration";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const [results, setResults] = useState([]);

  const handleQuery = async (query) => {
    try {
      console.log(query);
      const formData = new FormData();
      formData.append("prompt", query);

      const response = await axios.post(
        "http://localhost:8000/find_image/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const data = response.data.response;
      setResults(data);
      return data;
    } catch (error) {
      alert("Error fetching results: " + error.message);
      return [];
    }
  };

  return (
    <div className="App">
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route
          path="/search"
          element={<QuerySection onQuery={handleQuery} />}
        />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/generate-image" element={<ImageGeneration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
