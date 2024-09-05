import React, { useState } from "react";
import axios from "axios";

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [caption, setCaption] = useState("");
  const [enhance, setEnhance] = useState(false);
  const [error, setError] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      setSelectedFile(null);
      return;
    }

    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size should not exceed 2 MB.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    alert(
      "File uploaded successfully! You can now generate the summary or caption."
    );
  };

  const handleGenerateSummary = async () => {
    if (!selectedFile) {
      alert("Please select a file to generate a summary.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("enhance", enhance);

    try {
      const response = await axios.post(
        "http://localhost:8000/generate-summary/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.summary) {
        setSummary(response.data.summary);
        setError("");
      } else {
        setError("Failed to generate summary.");
      }
    } catch (error) {
      setError(
        "Error generating summary: " +
          (error.response?.data?.message || "Server error")
      );
    }
  };

  const handleGenerateCaption = async () => {
    if (!selectedFile) {
      alert("Please select a file to generate a caption.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("enhance", enhance);

    try {
      const response = await axios.post(
        "http://localhost:8000/generate-caption/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.caption) {
        setCaption(response.data.caption);
        setError("");
      } else {
        setError("Failed to generate caption.");
      }
    } catch (error) {
      setError(
        "Error generating caption: " +
          (error.response?.data?.message || "Server error")
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Upload Photo, Generate Summary or Caption
      </h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer"
      />

      {selectedFile && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            className="max-w-full h-auto border border-gray-300 rounded-lg shadow-md"
          />
        </div>
      )}

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={enhance}
          onChange={(e) => setEnhance(e.target.checked)}
          className="mr-2"
        />
        Enhance Photo
      </label>

      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4 w-full"
      >
        Upload
      </button>

      <button
        onClick={handleGenerateSummary}
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mb-4 w-full"
      >
        Generate Summary
      </button>

      <button
        onClick={handleGenerateCaption}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
      >
        Generate Caption
      </button>

      {error && (
        <div className="mt-4 p-2 border border-red-500 text-red-500 rounded-lg bg-red-50">
          {error}
        </div>
      )}
      {summary && (
        <div className="mt-6 p-4 border border-yellow-500 rounded-lg bg-yellow-50 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Generated Summary:</h3>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {caption && (
        <div className="mt-6 p-4 border border-green-500 rounded-lg bg-green-50 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Generated Caption:</h3>
          <p className="text-gray-700">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
