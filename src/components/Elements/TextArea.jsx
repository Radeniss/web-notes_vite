const TextArea = ({ label, id, value, onChange, rows = 4, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <textarea
        id={id}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onChange={onChange}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default TextArea;