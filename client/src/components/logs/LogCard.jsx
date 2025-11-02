'use client';

import Link from 'next/link';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate, calculateSuccessRate } from '../../lib/utils';

export const LogCard = ({ log }) => {
  const successRate = calculateSuccessRate(log);
  
  const getStatusVariant = () => {
    if (log.failedJobs > 0) return 'danger';
    if (log.newJobs > 0) return 'success';
    return 'primary';
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 text-balance line-clamp-2 text-sm">
            {log.fileName || log.sourceUrl}
          </h3>
          <Badge variant={getStatusVariant()}>
            {log.failedJobs > 0 ? 'With Errors' : 'Successful'}
          </Badge>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-semibold text-lg">{log.totalFetched}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-semibold text-lg text-green-700">{log.newJobs}</div>
            <div className="text-xs text-green-600">New</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-semibold text-lg text-blue-700">{log.updatedJobs}</div>
            <div className="text-xs text-blue-600">Updated</div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded">
            <div className="font-semibold text-lg text-red-700">{log.failedJobs}</div>
            <div className="text-xs text-red-600">Failed</div>
          </div>
        </div>

        {/* Success Rate */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Success Rate</span>
            <span>{successRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                successRate >= 90 ? 'bg-green-600' : 
                successRate >= 70 ? 'bg-yellow-600' : 'bg-red-600'
              }`}
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>

        {/* Metadata */}
        <div className="text-xs text-gray-500 space-y-1">
          <div className="truncate">Source: {log.sourceUrl}</div>
          <div>Completed: {formatDate(log.completed_at)}</div>
        </div>

        {/* Error Display */}
        {log.failedReasons && log.failedReasons.length > 0 && (
          <div className="mt-3 p-2 bg-red-50 rounded border border-red-200">
            <div className="text-xs font-medium text-red-800 mb-1">Errors:</div>
            <ul className="text-xs text-red-700 list-disc list-inside">
              {log.failedReasons.slice(0, 2).map((reason, index) => (
                <li key={index} className="truncate">{reason}</li>
              ))}
              {log.failedReasons.length > 2 && (
                <li>...and {log.failedReasons.length - 2} more</li>
              )}
            </ul>
          </div>
        )}

        {/* View Details Link */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Link 
            href={`/logs/${log._id}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};