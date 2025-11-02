'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useSingleJob } from '@/hooks/useSingleLog';
import { JobDetail } from '@/components/jobs/JobDetail';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id;
  const { job, loading, error } = useSingleJob(jobId);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link 
          href="/jobs" 
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 mb-4"
        >
          ← Back to Jobs
        </Link>
      </div>
      
      <JobDetail job={job} loading={loading} error={error} />
    </div>
  );
}