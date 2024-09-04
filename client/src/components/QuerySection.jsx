// src/components/QuerySection.jsx
import React, { useState } from 'react';

const QuerySection = ({ onQuery }) => {
  const [query, setQuery] = useState('');

  const handleQuery = () => {
    if (!query) {
      alert('Please enter a query.');
      return;
    }
    onQuery(query);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Search Photos</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleQuery}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default QuerySection;
