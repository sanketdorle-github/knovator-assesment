'use client';

export const EmptyState = ({ 
  title = "No data found",
  description = "There's nothing to display here yet.",
  action,
  icon,
  className = '' 
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      {icon && (
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
};