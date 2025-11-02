'use client';

import { useState } from 'react';
import { useLogs } from '@/hooks/useLogs';
import { LogList } from '@/components/logs/LogList';
import { LogStats } from '@/components/ui/LogStats';

export default function LogsPage() {
  const [page, setPage] = useState(1);
  const { logs, loading, error, pagination, refetch } = useLogs({
    page,
    limit: 12
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Import Logs</h1>
          <button
            onClick={() => refetch({ page, limit: 12 })}
            className="btn btn-secondary"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <LogStats logs={logs} />
        <LogList logs={logs} loading={loading} error={error} />

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <span className="text-sm text-gray-600">
              Page {page} of {pagination.pages}
            </span>
            
            <button
              onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages || loading}
              className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}