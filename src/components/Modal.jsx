const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full transform transition-all duration-300 ease-in-out scale-100 opacity-100 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition duration-200 transform hover:scale-110"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
