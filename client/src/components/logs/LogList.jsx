'use client';

import { LogCard } from "../ui/LogCard";
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const LogList = ({ logs, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading logs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">Failed to load logs</div>
        <div className="text-gray-500 text-sm">{error}</div>
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No import logs found</div>
        <p className="text-gray-400 text-sm mt-2">Import logs will appear here after job imports</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {logs.map((log) => (
        <LogCard key={log._id} log={log} />
      ))}
    </div>
  );
};