'use client';

import { useState, useEffect } from 'react';
import { jobsAPI } from '../lib/api';

export const useSingleJob = (jobId) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJob = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobsAPI.getById(id);
      setJob(response.data || null);
    } catch (err) {
      setError(err.message || 'Failed to fetch job');
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJob(jobId);
    }
  }, [jobId]);

  return {
    job,
    loading,
    error,
    refetch: () => jobId && fetchJob(jobId),
  };
};