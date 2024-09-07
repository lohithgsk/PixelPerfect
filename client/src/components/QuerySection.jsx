import React, { useState } from "react";
import { motion } from "framer-motion";

const QuerySection = ({ onQuery }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleQuery = async () => {
    if (!query) {
      alert("Please enter a query.");
      return;
    }

    setSearched(true);

    try {
      const data = await onQuery(query);
      setResults(Array.isArray(data) && data.length > 0 ? data : []);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    }
  };

  const handleClearQuery = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
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
            />
            <div className="absolute inset-y-0 right-0 flex items-center space-x-2">
              <button
                onClick={handleQuery}
                style={{ outline: "none" }}
                className="bg-blue-500 text-white py-3 px-6 rounded-r-lg transition duration-300 ease-in-out"
              >
                Search
              </button>
              <button
                onClick={handleClearQuery}
                style={{ outline: "none" }}
                className="bg-red-500 text-white py-3 px-6 rounded-r-lg transition duration-300 ease-in-out"
              >
                Clear
              </button>
            </div>
          </div>

          <motion.div
            className={`flex flex-col items-center gap-8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold bg-gradient-to-l from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent mb-4 text-center">
              Results
            </h2>

            <div className="w-full px-4 sm:px-8">
              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {results.map((url, index) => (
                    <div
                      key={index}
                      className="relative w-80 h-80 bg-gray-100 p-2 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
                      style={{
                        borderImage:
                          "linear-gradient(to left, pink, purple, blue) 1",
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
                searched &&
                query && (
                  <p className="text-gray-500 col-span-full text-center">
                    No results found in the storage for the given query.
                  </p>
                )
              )}
            </div>
          </motion.div>
        </div>

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
