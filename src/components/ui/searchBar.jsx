import { useContext, useState } from "react";
import { ProductContext } from "@/features/products/Context/ProductContext";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const { setFilters } = useContext(ProductContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cập nhật search mà vẫn giữ nguyên các filter khác như category
    setFilters((prev) => ({ ...prev, search: keyword.trim() }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="relative w-full">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Type what you're seeking here"
          className="w-full pl-4 pr-14 py-3 rounded-md text-gray-700 focus:outline-none shadow-sm border border-transparent focus:border-indigo-300 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 
                     bg-indigo-600 hover:bg-indigo-700 
                     px-6 py-2 rounded-md text-white transition-colors"
        >
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
