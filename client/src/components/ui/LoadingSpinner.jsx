'use client';

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-8', 
    lg: 'size-12'
  };

  return (
    <div 
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 ${sizeClasses[size]} ${className}`} 
    />
  );
};