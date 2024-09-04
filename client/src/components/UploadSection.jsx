// src/components/UploadSection.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('/api/upload', formData);
      alert('File uploaded successfully!');
    } catch (error) {
      alert('Failed to upload file.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload Photo</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadSection;
