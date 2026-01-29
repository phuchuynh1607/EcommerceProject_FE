import { ProductContext } from "../Context/ProductContext";
import ProductSidebar from "../components/ProductSideBar";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../hooks/useProducts";

const ProductListPage = () => {
  const { products, loading, error, filters, setFilters } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  // Hiển thị nếu có lỗi (ví dụ: mất kết nối server hoặc lỗi CORS)
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white shadow-md rounded-lg">
          <p className="text-red-500 font-bold mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex gap-6 py-8 px-6">
      {/* SIDEBAR - 20% width */}
      <aside className="w-1/5 shrink-0">
        <ProductSidebar filters={filters} setFilters={setFilters} />
      </aside>

      {/* MAIN CONTENT - 80% width */}
      <main className="flex-1">
        <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded">
          <span className="text-sm font-medium">
            Filter by : {filters.search}
          </span>
          {/* Các nút bấm Sort giống Shopee */}
        </div>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
    </div>
  );
};
export default ProductListPage;
