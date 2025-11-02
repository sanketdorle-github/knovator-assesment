'use client';

import { useState } from 'react';
import { JOB_TYPES, COMMON_LOCATIONS } from '../../lib/constants';

export const JobFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    company: '',
    location: '',
    type: '',
  });

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      company: '',
      location: '',
      type: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.company || filters.location || filters.type;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Company Filter */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={filters.company}
            onChange={(e) => handleFilterChange('company', e.target.value)}
            placeholder="Filter by company..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Location Filter */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            id="location"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            {COMMON_LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type Filter */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            id="type"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.company && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              Company: {filters.company}
              <button
                onClick={() => handleFilterChange('company', '')}
                className="ml-1 hover:text-primary-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.location && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Location: {filters.location}
              <button
                onClick={() => handleFilterChange('location', '')}
                className="ml-1 hover:text-green-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.type && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Type: {filters.type}
              <button
                onClick={() => handleFilterChange('type', '')}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};