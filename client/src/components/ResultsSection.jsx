// src/components/ResultsSection.jsx
import React from 'react';

const ResultsSection = ({ results }) => (
  <div className="results-section">
    <h2>Results</h2>
    {results.length > 0 ? (
      <div className="results-grid">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <img src={result.imageUrl} alt={result.description} />
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>No results found.</p>
    )}
  </div>
);

export default ResultsSection;
