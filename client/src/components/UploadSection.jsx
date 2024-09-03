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
    <div className="upload-section">
      <h2>Upload Photo</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadSection;
