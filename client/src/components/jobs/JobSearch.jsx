'use client';

import { useState } from 'react';
import { useJobSearch } from '../../hooks/useJobSearch';
import { JobList } from './JobList';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const JobSearch = () => {
  const [query, setQuery] = useState('');
  const { results, loading, error, hasSearched, searchJobs } = useJobSearch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    await searchJobs(query.trim());
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter job title, description, skills, or keywords..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="btn btn-primary px-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-gray-600">Searching jobs...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <div className="text-red-600 mb-2 text-lg">Search failed</div>
          <div className="text-gray-500">{error}</div>
          <button
            onClick={() => searchJobs(query)}
            className="mt-4 btn btn-secondary"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Search Results */}
      {hasSearched && !loading && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Results
            </h2>
            <div className="text-sm text-gray-600">
              Found {results.length} job{results.length !== 1 ? 's' : ''} for "{query}"
            </div>
          </div>
          <JobList jobs={results} loading={false} error={null} />
        </div>
      )}

      {/* No Results */}
      {hasSearched && !loading && results.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No jobs found</div>
          <p className="text-gray-400">
            Try different keywords or check your spelling
          </p>
        </div>
      )}

      {/* Search Tips */}
      {!hasSearched && !loading && (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">
            Search tips:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400 max-w-2xl mx-auto">
            <div>• Use specific job titles</div>
            <div>• Include skills or technologies</div>
            <div>• Try different keywords</div>
          </div>
        </div>
      )}
    </div>
  );
};