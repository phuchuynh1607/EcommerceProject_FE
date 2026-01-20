import { Outlet, Link } from "react-router-dom";
import SearchBar from "./components/ui/searchBar";

function App() {
  return (
    <div>
      {/* HEADER */}
      <header className="bg-indigo-700 text-white">
        {/* TOP NAV */}
        <div>
          <nav className="max-w-7xl mx-auto flex justify-end gap-4 px-6 py-2 text-sm">
            <Link to="/" className="hover:text-orange-400">
              Home
            </Link>
            <Link to="/login" className="hover:text-orange-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-orange-400">
              Register
            </Link>
            <Link to="/product/1" className="hover:text-orange-400">
              Test Product
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
          <SearchBar />

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
