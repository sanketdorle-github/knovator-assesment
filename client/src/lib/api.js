import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle different error scenarios
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again');
    }
    
    if (!error.response) {
      throw new Error('Network error - please check your connection');
    }
    
    const status = error.response.status;
    const message = error.response.data?.message || 'An unexpected error occurred';
    
    switch (status) {
      case 400:
        throw new Error(message || 'Bad request');
      case 401:
        throw new Error('Unauthorized - please login again');
      case 403:
        throw new Error('Forbidden - insufficient permissions');
      case 404:
        throw new Error(message || 'Resource not found');
      case 500:
        throw new Error('Server error - please try again later');
      default:
        throw new Error(message);
    }
  }
);

// Import Logs API
export const importLogsAPI = {
  getAll: (params = {}) => api.get('/import-logs', { params }),
  getById: (id) => api.get(`/import-logs/${id}`),
};

// Jobs API
export const jobsAPI = {
  getAll: (params = {}) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  search: (query, params = {}) => api.get('/jobs/search', { 
    params: { q: query, ...params } 
  }),
};

// Statistics API (if you want to add stats endpoints)
export const statsAPI = {
  getOverview: () => api.get('/stats/overview'),
  getImportStats: (period = '30d') => api.get(`/stats/imports?period=${period}`),
};

export default api;