import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSearch, IoClose } from 'react-icons/io5';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-6"
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IoSearch className="text-primary-400" />
        </div>
        <input
          type="text"
          className="input pl-10 pr-10"
          placeholder="Cari catatan..."
          value={query}
          onChange={handleSearch}
        />
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={clearSearch}
          >
            <IoClose className="text-primary-400 hover:text-primary-600" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;
