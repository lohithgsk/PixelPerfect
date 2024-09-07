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
    <div className="min-h-screen bg-cover bg-top px-4 sm:px-6 lg:px-8 bg-gradient-to-l from-pink-500 via-purple-400 to-blue-400 flex items-center justify-center">
      {/* Main Container */}
      <div
        className="relative h-auto w-full max-w-7xl p-8 rounded-2xl shadow-2xl transition-transform duration-1000 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100"
        style={{ backgroundColor: "rgba(252, 247, 247, 0.9)" }}
      >
        {/* Search Section */}
        <div className="py-8">
          {/* Search Heading */}
          <h2 className="text-3xl font-semibold bg-gradient-to-l from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent mb-6 text-center">
            Search Photos
          </h2>

          {/* Search Box */}
          <div className="relative w-full max-w-lg mb-6 mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query"
              className="w-full p-4 pr-20 bg-gray-100 rounded-lg shadow-sm focus:outline-black transition duration-300 ease-in-out"
              style={{
                border: "none",
              }}
            />
            <button
              onClick={handleQuery}
              className="absolute right-0 top-0 bottom-0 bg-blue-500 text-white py-3 px-6 rounded-r-lg focus:outline-black transition duration-300 ease-in-out"
            >
              Search
            </button>
          </div>

          {/* Results Section */}
          <motion.div
            className={`flex flex-col items-center gap-8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Results Heading */}
            <h2 className="text-2xl font-semibold bg-gradient-to-l from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent mb-4 text-center">
              Results
            </h2>

            {/* Results Grid */}
            <div className="w-full px-4 sm:px-8"> {/* Added padding here */}
              {results.length > 0 ? (
                results.length === 1 ? (
                  <div className="flex justify-center w-full">
                    <div
                      className="relative w-80 h-80 bg-gray-100 p-2 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
                      style={{
                        borderImage: "linear-gradient(to left, pink, purple, blue) 1",
                        borderWidth: "4px",
                        borderStyle: "solid",
                      }}
                      onClick={() => handleImageClick(results[0])}
                    >
                      <img
                        src={results[0]}
                        alt="Search result"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  </div>
                ) : results.length === 2 ? (
                  <div className="flex justify-center gap-8"> {/* Increased gap */}
                    {results.map((url, index) => (
                      <div
                        key={index}
                        className="relative w-80 h-80 bg-gray-100 p-2 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
                        style={{
                          borderImage: "linear-gradient(to left, pink, purple, blue) 1",
                          borderWidth: "4px",
                          borderStyle: "solid",
                        }}
                        onClick={() => handleImageClick(url)}
                      >
                        <img
                          src={url}
                          alt="Search result"
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"> {/* Increased gap */}
                    {results.map((url, index) => (
                      <div
                        key={index}
                        className="relative w-80 h-80 bg-gray-100 p-2 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
                        style={{
                          borderImage: "linear-gradient(to left, pink, purple, blue) 1",
                          borderWidth: "4px",
                          borderStyle: "solid",
                        }}
                        onClick={() => handleImageClick(url)}
                      >
                        <img
                          src={url}
                          alt="Search result"
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <p className="text-gray-500 col-span-full text-center">No results found.</p>
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
    </div>
  );
};

export default QuerySection;
