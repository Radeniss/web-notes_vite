const Input = ({ label, id, value, onChange, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        id={id}
        className="w-full font-semibold px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;