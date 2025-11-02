// Format date to readable string
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'N/A';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  return new Date(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(dateString);
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Format numbers with commas
export const formatNumber = (number) => {
  if (typeof number !== 'number') return '0';
  return number.toLocaleString();
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate color based on status
export const getStatusColor = (log) => {
  if (log.failedJobs > 0) return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' };
  if (log.newJobs > 0) return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
  return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
};

// Calculate import success rate
export const calculateSuccessRate = (log) => {
  if (!log.totalFetched) return 0;
  const successful = log.totalFetched - log.failedJobs;
  return Math.round((successful / log.totalFetched) * 100);
};

// Validate MongoDB ObjectId
export const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// Build query string from filters
export const buildQueryString = (filters) => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      params.append(key, value);
    }
  });
  
  return params.toString();
};

// Parse query string to filters object
export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  const filters = {};
  
  for (const [key, value] of params.entries()) {
    filters[key] = value;
  }
  
  return filters;
};

// Local storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};