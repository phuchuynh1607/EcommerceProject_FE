import React from "react";

const CustomButton = React.forwardRef(
  (
    {
      children,
      onClick,
      type = "button",
      variant = "primary",
      className = "",
      disabled = false,
      isLoading = false,
      leftIcon = null,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      login_register:
        "bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold rounded-xl shadow-lg py-3 px-6 transform hover:scale-105 active:scale-95",
      add_minus:
        "p-1.5 bg-transparent hover:bg-white hover:shadow-sm rounded-md text-gray-600 disabled:opacity-30",
      start_shopping:
        "px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
      back: "text-sm bg-indigo-600 hover:bg-indigo-800 mb-6 px-5 py-3 px-6 rounded-lg text-white font-bold",
      login_to_see_more:
        "px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-bold shadow-lg transform hover:scale-105",
      reset:
        "w-full py-1.5 bg-indigo-600 text-md font-medium border border-indigo-700 text-gray-100 hover:bg-indigo-700 rounded-md",
      decrement_and_increment:
        "px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300",
      search_button:
        "absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md text-whites",
      checkout:
        "w-full py-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold text-lg shadow-xl shadow-indigo-100 active:scale-95 disabled:bg-gray-400",
    };
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant] || variants.login_register} ${className}`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>Processing...</span>
          </div>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0 mr-2">{leftIcon}</span>}
            <span className="truncate">{children}</span>
          </>
        )}
      </button>
    );
  },
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
