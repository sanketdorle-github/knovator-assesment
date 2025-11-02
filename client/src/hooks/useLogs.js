'use client';

import { useState, useEffect } from 'react';
import { importLogsAPI } from '../lib/api';

export const useLogs = (initialParams = {}) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchLogs = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await importLogsAPI.getAll(params);
      setLogs(response.data || []);
      setPagination(response.pagination || {});
    } catch (err) {
      setError(err.message || 'Failed to fetch import logs');
      setLogs([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(initialParams);
  }, []);

  return {
    logs,
    loading,
    error,
    pagination,
    refetch: fetchLogs,
  };
};