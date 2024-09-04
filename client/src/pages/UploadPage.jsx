// src/pages/UploadPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [enhance, setEnhance] = useState(false);
  const [imageSummary, setImageSummary] = useState('');
  const [displaySummary, setDisplaySummary] = useState(false);
  const [displayCaption, setDisplayCaption] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if the selected file is an image
    if (file && !file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file.');
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // Check if the file size is less than 2 MB
    if (file && file.size > 2 * 1024 * 1024) {
      setErrorMessage('File size should not exceed 2 MB.');
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // If the file is valid, set it and create a preview URL
    setSelectedFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    setImageSummary('');
    setErrorMessage(''); // Clear previous errors
  };

  const handleEnhanceChange = (e) => {
    setEnhance(e.target.checked);
  };

  const handleDisplaySummaryChange = (e) => {
    setDisplaySummary(e.target.checked);
  };

  const handleDisplayCaptionChange = (e) => {
    setDisplayCaption(e.target.checked);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('enhance', enhance); // Send enhance flag to backend
    formData.append('displaySummary', displaySummary); // Send display summary flag
    formData.append('displayCaption', displayCaption); // Send display caption flag

    try {
      const response = await axios.post('/api/upload', formData);
      // Assuming backend returns a description and/or caption based on flags
      setImageSummary(
        displaySummary
          ? response.data.summary
          : displayCaption
          ? response.data.caption
          : ''
      );
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
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer mb-4"
        />
        {errorMessage && (
          <p className="text-red-500 mb-2 text-sm">{errorMessage}</p>
        )}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Selected Preview"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={enhance}
            onChange={handleEnhanceChange}
            className="mr-2"
          />
          Enhance Photo
        </label>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={displaySummary}
            onChange={handleDisplaySummaryChange}
            className="mr-2"
          />
          Display Summary
        </label>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={displayCaption}
            onChange={handleDisplayCaptionChange}
            className="mr-2"
          />
          Display Caption
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
          <h3 className="text-xl font-semibold mb-4">Image Result</h3>
          <p className="text-gray-700">{imageSummary}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
