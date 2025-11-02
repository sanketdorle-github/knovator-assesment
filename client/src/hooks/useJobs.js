'use client';

import { useState, useEffect } from 'react';
import { jobsAPI } from '../lib/api';

export const useJobs = (initialParams = {}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchJobs = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobsAPI.getAll(params);
      setJobs(response.data || []);
      setPagination(response.pagination || {});
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
      setJobs([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(initialParams);
  }, []);

  return {
    jobs,
    loading,
    error,
    pagination,
    refetch: fetchJobs,
  };
};