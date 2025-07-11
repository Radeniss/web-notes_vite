const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseClasses = "px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    danger: "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;