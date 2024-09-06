import React, { useState } from "react";

const QuerySection = ({ onQuery }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleQuery = () => {
    if (!query) {
      alert("Please enter a query.");
      return;
    }
    console.log(query);
    onQuery(query).then((data) => setResults(data));
    console.log(results);
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

      <div className="bg-white p-6 rounded-lg shadow-md my-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Results</h2>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((url, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded">
                <img
                  src={url}
                  alt="Search result"
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default QuerySection;
