import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div>
      {/* HEADER */}
      <header className="bg-indigo-700 text-white">
        {/* TOP NAV */}
        <div>
          <nav className="max-w-7xl mx-auto flex justify-end gap-4 px-6 py-2 text-sm">
            <Link to="/" className="hover:text-orange-400">
              Trang Chủ
            </Link>
            <Link to="/login" className="hover:text-orange-400">
              Đăng Nhập
            </Link>
            <Link to="/register" className="hover:text-orange-400">
              Đăng Ký
            </Link>
            <Link to="/product/1" className="hover:text-orange-400">
              Test SP ID 1
            </Link>
          </nav>
        </div>

        {/* MAIN HEADER */}
        <div className="max-w-7xl mx-auto flex items-center gap-10 px-6 py-4">
          {/* LOGO */}
          <div className="flex items-center gap-3 shrink-0">
            <img
              className="w-16 h-16"
              src="https://img.icons8.com/fluent/344/shopping-bag.png"
              alt="shopping-bag"
            />
            <span className="text-2xl font-bold tracking-wide">Ecm</span>
          </div>

          {/* SEARCH */}
          <div className="flex-1">
            <div className="relative w-full ">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-4 pr-14 py-3 rounded-md text-gray-700 focus:outline-none"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2
                       bg-indigo-600 hover:bg-indigo-500
                       px-6 py-2 rounded-md text-white"
              >
                🔍
              </button>
            </div>
          </div>

          {/* CART ICON */}
          <div className="shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-12 h-12 stroke-white fill-none"
            >
              <path
                d="M6 6h4l5 22h18l4-14H14"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="38" r="3" fill="white" />
              <circle cx="34" cy="38" r="3" fill="white" />
            </svg>
          </div>
        </div>
      </header>

      {/* App.jsx */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Thêm một thẻ div bọc ngoài Outlet để xử lý bo góc */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
