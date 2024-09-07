import React, { useState } from "react";
import { motion } from "framer-motion";
const QuerySection = ({ onQuery }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleQuery = () => {
    if (!query) {
      alert("Please enter a query.");
      return;
    }
    onQuery(query).then((data) => setResults(data));
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
      <div className="min-h-screen bg-cover bg-top px-4 sm:px-6 lg:px-8 bg-gradient-to-l from-pink-500 via-purple-400 to-blue-400">
        {/* Search Section */}
        <div className="max-w-5xl mx-auto py-8">
          {/* Search Heading */}
          <h2 className="text-3xl
           
           font-semibold text-white mb-6 text-center">
            Search Photos
          </h2>
  
          {/* Search Box */}
          <div className="flex w-full max-w-lg mb-6 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query"
              className="flex-1 p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleQuery}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Search
            </button>
          </div>
  
          {/* Results Section */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Results Heading */}
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Results
            </h2>
  
            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.length > 0 ? (
                results.map((url, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-2 rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => handleImageClick(url)}
                  >
                    <img
                      src={url}
                      alt="Search result"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-200 col-span-full">No results found.</p>
              )}
            </div>
          </motion.div>
        </div>
  
        {/* Full Screen Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <img
              src={selectedImage}
              alt="Full screen"
              className="max-w-full max-h-full rounded shadow-lg"
            />
          </div>
        )}
      </div>
    );
  };
export default QuerySection;
