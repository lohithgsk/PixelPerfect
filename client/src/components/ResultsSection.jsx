// src/components/ResultsSection.jsx
import React from 'react';

const ResultsSection = ({ results }) => (
  <div className="bg-white p-6 rounded-lg shadow-md my-6 max-w-4xl mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Results</h2>
    {results.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((result, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded">
            <img
              src={result.imageUrl}
              alt={result.description}
              className="w-full h-48 object-cover rounded"
            />
            <p className="mt-2 text-sm text-gray-700">{result.description}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No results found.</p>
    )}
  </div>
);

export default ResultsSection;
