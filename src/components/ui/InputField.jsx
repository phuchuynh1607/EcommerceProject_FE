import React from "react";

const InputField = React.forwardRef(
  ({ name, type = "text", error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          {...props}
          ref={ref}
          name={name}
          type={type}
          className={`w-full p-1 text-indigo-700 border-b-2 outline-none focus:bg-gray-300 transition-colors ${
            error ? "border-red-500 mb-1" : "border-indigo-500 mb-6"
          }`}
        />
        {error && <p className="text-red-500 text-[10px] mb-4">{error}</p>}
      </div>
    );
  },
);

export default InputField;
