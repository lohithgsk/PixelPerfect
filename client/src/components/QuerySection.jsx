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
    <div className="query-section">
      <h2>Search Photos</h2>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter your query" 
      />
      <button onClick={handleQuery}>Search</button>
    </div>
  );
};

export default QuerySection;
