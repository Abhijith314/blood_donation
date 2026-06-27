import React from 'react';

const Card = ({ children, className = '', hoverable = false }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all ${
        hoverable ? 'hover:shadow-md hover:border-gray-200 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;