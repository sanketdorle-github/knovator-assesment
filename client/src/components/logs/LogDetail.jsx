'use client';

import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { formatDate, calculateSuccessRate } from '../../lib/utils';

export const LogDetail = ({ log, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading log details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">Failed to load log details</div>
        <div className="text-gray-500 text-sm">{error}</div>
      </div>
    );
  }

  if (!log) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">Log not found</div>
      </div>
    );
  }

  const successRate = calculateSuccessRate(log);

  return (
    <div className="space-y-6">
      {/* Log Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Import Log Details
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <span>Source: {log.sourceUrl}</span>
                <Badge variant={log.failedJobs > 0 ? 'danger' : 'success'}>
                  {log.failedJobs > 0 ? 'With Errors' : 'Successful'}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Import started: {formatDate(log.timestamp)} • 
            Completed: {formatDate(log.completed_at)}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{log.totalFetched}</div>
            <div className="text-sm text-gray-600">Total Jobs</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{log.newJobs}</div>
            <div className="text-sm text-gray-600">New Jobs</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{log.updatedJobs}</div>
            <div className="text-sm text-gray-600">Updated Jobs</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{log.failedJobs}</div>
            <div className="text-sm text-gray-600">Failed Jobs</div>
          </CardContent>
        </Card>
      </div>

      {/* Success Rate */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Rate</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Import Success</span>
            <span className="text-sm font-medium">{successRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${
                successRate >= 90 ? 'bg-green-600' : 
                successRate >= 70 ? 'bg-yellow-600' : 'bg-red-600'
              }`}
              style={{ width: `${successRate}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Error Details */}
      {log.failedReasons && log.failedReasons.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Details</h3>
            <div className="space-y-2">
              {log.failedReasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 rounded border border-red-200">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-sm text-red-700">{reason}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Info */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Source URL:</span>
                <a 
                  href={log.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm truncate max-w-[200px]"
                >
                  {log.sourceUrl}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">File Name:</span>
                <span className="font-medium">{log.fileName}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Started:</span>
                <span className="font-medium">{formatDate(log.timestamp)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed:</span>
                <span className="font-medium">{formatDate(log.completed_at)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};