import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Rotating Circle */}
        <div className="relative flex items-center justify-center w-20 h-20 mb-8 border-4 border-blue-500 rounded-full animate-spin">
          <div className="absolute w-12 h-12 bg-blue-500 rounded-full"></div>
        </div>
        
        {/* Pulsating Dots */}
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-200"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-400"></div>
        </div>
        
        {/* Loading Text */}
        <div className="mt-8 text-xl font-bold text-gray-700 animate-bounce">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingPage;
