import SearchBar from "./searchBar";
import { Link } from "react-router-dom";
import { useCart } from "@/features/cart/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
const MainNav = ({ isCartPage = false }) => {
  const { uniqueItemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleCartClick = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first to use this!");
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 gap-10">
      {/* LOGO & TITLE SECTION */}
      <Link to="/" className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <img
            className="w-16 h-16" // Thu nhỏ nhẹ logo cho cân đối
            src="https://img.icons8.com/fluent/344/shopping-bag.png"
            alt="shopping-bag"
          />
          <span className="text-2xl font-bold tracking-wide ">Ecm</span>
        </div>

        {/* Vạch kẻ và chữ Shopping Cart hiện ra khi ở trang Cart */}
        {isCartPage && (
          <>
            <div className="h-8 w-[1px] bg-indigo-500 mx-2"></div>
            <span className="text-xl  font-medium">Shopping Cart</span>
          </>
        )}
      </Link>

      {/* SEARCH SECTION - Co dãn dựa trên trang */}
      <div
        className={`${isCartPage ? "w-1/3" : "flex-1"} transition-all duration-300`}
      >
        <SearchBar />
      </div>

      {!isCartPage && (
        <div className="group cursor-pointer" onClick={handleCartClick}>
          <div className="relative inline-block">
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

            {uniqueItemCount > 0 && (
              <div
                className="
            absolute
            -top-px -right-px
            bg-white text-indigo-700 text-[12px] font-bold
            min-w-[20px] h-[20px] px-[5px]
            rounded-full
            flex items-center justify-center
            border-2 border-indigo-500
            z-10
          "
              >
                {uniqueItemCount}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainNav;
