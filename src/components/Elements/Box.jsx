import React from 'react';

const Box = ({ 
  children, 
  className = "",
  ...props 
}) => {
  return (
    <div 
      className={`border border-gray-300 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Box;