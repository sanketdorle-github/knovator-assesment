'use client';

import { useState } from 'react';
import { jobsAPI } from '../lib/api';

export const useJobSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchJobs = async (query, params = {}) => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await jobsAPI.search(query.trim(), params);
      setResults(response.data || []);
      setHasSearched(true);
    } catch (err) {
      setError(err.message || 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setResults([]);
    setError(null);
    setHasSearched(false);
    setLoading(false);
  };

  return {
    results,
    loading,
    error,
    hasSearched,
    searchJobs,
    clearSearch,
  };
};