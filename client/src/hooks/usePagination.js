'use client';

import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 1, initialLimit = 12) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage(prev => Math.max(1, prev - 1));
  }, []);

  const goToPage = useCallback((newPage) => {
    setPage(Math.max(1, newPage));
  }, []);

  const changeLimit = useCallback((newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  return {
    page,
    limit,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
    reset,
    offset: (page - 1) * limit,
  };
};