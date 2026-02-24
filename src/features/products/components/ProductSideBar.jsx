import CustomButton from "@/components/ui/CustomButton";
const ProductSidebar = ({ filters, setFilters }) => {
  const categories = [
    { id: 1, name: "Men Clothes", value: "men's clothing" },
    { id: 2, name: "Jewelry", value: "jewelery" },
    { id: 3, name: "Electronics", value: "electronics" },
    { id: 4, name: "Women Clothes", value: "women's clothing" },
  ];

  const handleCategoryClick = (categoryValue) => {
    const newCategory = filters.category === categoryValue ? "" : categoryValue;
    setFilters({ ...filters, category: newCategory });
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
          const active = filters.category === cat.value;
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
      {(filters.category || filters.search) && (
        <div className="px-4 pb-4">
          <CustomButton
            onClick={() => setFilters({ ...filters, category: "", search: "" })}
            variant="reset"
          >
            Reset
          </CustomButton>
        </div>
      )}
    </div>
  );
};
export default ProductSidebar;
