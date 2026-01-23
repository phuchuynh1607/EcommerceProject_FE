const ProductSidebar = ({ filterArgs, setFilterArgs }) => {
  // Danh sách categories lấy chính xác từ dữ liệu của bạn
  const categories = [
    { id: 1, name: "Men Clothes", value: "men's clothing" },
    { id: 2, name: "Jewelry", value: "jewelery" },
    { id: 3, name: "Electronics", value: "electronics" },
    { id: 4, name: "Women Clothes", value: "women's clothing" },
  ];

  const handleCategoryClick = (categoryValue) => {
    // Nếu click lại vào cái đang chọn thì bỏ chọn
    const newCategory =
      filterArgs.category === categoryValue ? "" : categoryValue;
    setFilterArgs({ ...filterArgs, category: newCategory });
  };

  return (
    <div className="bg-white mb-4 rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Header */}
      <h3 className="font-semibold px-4 py-3 bg-indigo-700 flex items-center gap-2 text-sm uppercase text-white">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
        </svg>
        Categories
      </h3>

      {/* Body */}
      <ul className="py-3 px-2 space-y-1">
        {categories.map((cat) => {
          const active = filterArgs.category === cat.value;
          return (
            <li
              key={cat.id}
              onClick={() => handleCategoryClick(cat.value)}
              className={`
            cursor-pointer text-sm flex items-center gap-2
            px-3 py-2 rounded-md transition-all
            ${
              active
                ? "bg-orange-50 text-indigo-500 font-semibold"
                : "text-gray-700 hover:bg-gray-100 hover:text-indigo-500"
            }
          `}
            >
              {active && <span className="text-[10px]">▶</span>}
              {cat.name}
            </li>
          );
        })}
      </ul>

      {/* Reset */}
      {filterArgs.category && (
        <div className="px-4 pb-4">
          <button
            onClick={() => setFilterArgs({ ...filterArgs, category: "" })}
            className="w-full py-1.5 bg-indigo-600 text-md font-medium border border-indigo-700 text-gray-100 hover:bg-indigo-700 rounded-md"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};
export default ProductSidebar;
