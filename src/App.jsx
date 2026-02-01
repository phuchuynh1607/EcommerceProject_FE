import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";
import MainNav from "./components/ui/MainNav";

function App() {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Chào tạm biệt trước khi xóa dữ liệu user
      alert(`Goodbye ${user?.username || "User"}, see you again!`);
      logout(); // Sau đó mới gọi hàm logout để xóa token/state
    }
  };
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

            {!user ? (
              <>
                <Link to="/login" className="hover:text-orange-400">
                  Login
                </Link>
                <Link to="/register" className="hover:text-orange-400">
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="relative group">
                  <button className="inline-flex items-center text-white hover:text-orange-400 focus:outline-none transition-colors font-medium">
                    {user.username}
                    <svg
                      className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* DROP DOWN MENU - THAY ĐỔI Ở ĐÂY */}
                  <div
                    className="absolute left-0 mt-2 py-2 w-40 bg-white shadow-xl rounded-md border border-gray-100 
                  /* Trạng thái mặc định: Ẩn và đẩy xuống một chút */
                  opacity-0 invisible translate-y-2 
                  /* Trạng thái khi Hover: Hiện và trượt lên lại */
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
                  /* Thời gian và kiểu chuyển động */
                  transition-all duration-300 ease-out z-50"
                  >
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/profile/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      My Purchase
                    </Link>
                    <button
                      onClick={handleLogout}
                      className=" px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>

        {/* MAIN HEADER */}
        <MainNav />
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
