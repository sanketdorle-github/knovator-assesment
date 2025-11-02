'use client';

import { Card, CardContent } from '../ui/Card';
import { formatDate } from '../../lib/utils';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const JobDetail = ({ job, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading job details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">Failed to load job details</div>
        <div className="text-gray-500 text-sm">{error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">Job not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Job Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="font-medium">{job.company}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {job.type}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Imported on {formatDate(job.imported_at)}
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
          <div className="prose max-w-none">
            <div 
              className="text-gray-700 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br/>') }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Job Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Job Type:</span>
                <span className="font-medium">{job.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Job ID:</span>
                <span className="font-mono text-sm">{job.job_id}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Source:</span>
                <a 
                  href={job.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm truncate max-w-[200px]"
                >
                  {job.sourceUrl}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Imported:</span>
                <span className="font-medium">{formatDate(job.imported_at)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};