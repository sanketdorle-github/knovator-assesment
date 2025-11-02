// Pagination constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  LIMIT_OPTIONS: [12, 24, 48, 96],
};

// Job types
export const JOB_TYPES = [
  'Full Time',
  'Part Time',
  'Contract',
  'Freelance',
  'Internship',
  'Temporary',
];

// Common locations
export const COMMON_LOCATIONS = [
  'USA',
  'UK',
  'Canada',
  'Germany',
  'Australia',
  'Remote',
  'Worldwide',
];

// Sort options
export const SORT_OPTIONS = {
  LOGS: [
    { value: 'timestamp_desc', label: 'Newest First' },
    { value: 'timestamp_asc', label: 'Oldest First' },
    { value: 'totalFetched_desc', label: 'Most Jobs First' },
  ],
  JOBS: [
    { value: 'imported_at_desc', label: 'Newest First' },
    { value: 'imported_at_asc', label: 'Oldest First' },
    { value: 'title_asc', label: 'Title A-Z' },
    { value: 'title_desc', label: 'Title Z-A' },
  ],
};

// API endpoints
export const API_ENDPOINTS = {
  IMPORT_LOGS: '/api/import-logs',
  JOBS: '/api/jobs',
  SEARCH: '/api/jobs/search',
};

// Time periods for statistics
export const TIME_PERIODS = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' },
  { value: 'all', label: 'All time' },
];