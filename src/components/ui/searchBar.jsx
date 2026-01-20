import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ placeholder = "Tìm kiếm sản phẩm...", onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    // Nếu bạn truyền prop onSearch, nó sẽ chạy (dành cho xử lý tại chỗ)
    if (onSearch) {
      onSearch(keyword);
    } else {
      // Mặc định: Chuyển hướng sang trang search với query param
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="relative w-full">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-4 pr-14 py-3 rounded-md text-gray-700 focus:outline-none shadow-sm border border-transparent focus:border-indigo-300 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 
                     bg-indigo-600 hover:bg-indigo-500 
                     px-6 py-2 rounded-md text-white transition-colors"
        >
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;