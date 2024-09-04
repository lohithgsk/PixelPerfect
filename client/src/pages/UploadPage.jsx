// src/pages/UploadPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [enhance, setEnhance] = useState(false);
  const [imageSummary, setImageSummary] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImageSummary(''); // Clear the previous summary when a new file is selected

    // Create a preview URL for the selected image
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null); // Clear the preview if no file is selected
    }
  };

  const handleEnhanceChange = (e) => {
    setEnhance(e.target.checked);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('enhance', enhance); // Send enhance flag to backend

    try {
      const response = await axios.post('/api/upload', formData);
      setImageSummary(response.data.description); // Assume backend returns description
      alert('File uploaded successfully!');
      setPreview(null); // Clear the preview after upload
      setSelectedFile(null); // Clear the selected file after upload
    } catch (error) {
      alert('Failed to upload file.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 my-10">
      <h2 className="text-2xl font-semibold mb-6">Upload and Enhance Photo</h2>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer mb-4"
        />
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Selected Preview"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={enhance}
            onChange={handleEnhanceChange}
            className="mr-2"
          />
          Enhance Photo
        </label>
        <button
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          {enhance ? 'Enhance and Upload' : 'Upload'}
        </button>
      </div>
      {imageSummary && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md w-full mt-6">
          <h3 className="text-xl font-semibold mb-4">Image Summary</h3>
          <p className="text-gray-700">{imageSummary}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
