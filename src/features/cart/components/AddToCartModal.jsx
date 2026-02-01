const AddToCartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-2xl flex flex-col items-center max-w-sm w-full animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <p className="text-xl font-medium text-center">
          Item has been added to your shopping cart
        </p>

        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-400 hover:text-white underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default AddToCartModal;
