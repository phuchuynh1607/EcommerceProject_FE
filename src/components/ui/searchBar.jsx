import { useContext, useState } from "react";
import { ProductContext } from "@/context/ProductContext";
import CustomButton from "./CustomButton";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const { setFilters } = useContext(ProductContext);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <CustomButton type="submit" variant="search_button">
          🔍
        </CustomButton>
      </div>
    </form>
  );
};

export default SearchBar;
