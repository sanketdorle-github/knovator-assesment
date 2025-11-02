'use client';

import { JobCard } from './JobCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const JobList = ({ jobs, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading jobs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">Failed to load jobs</div>
        <div className="text-gray-500 text-sm">{error}</div>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No jobs found</div>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};