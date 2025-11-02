'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useSingleLog } from '../../../../hooks/useSingleLog';
import { LogDetail } from '../../../../components/logs/LogDetail';

export default function LogDetailPage() {
  const params = useParams();
  const logId = params.id;
  const { log, loading, error } = useSingleLog(logId);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link 
          href="/logs" 
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 mb-4"
        >
          ← Back to Logs
        </Link>
      </div>
      
      <LogDetail log={log} loading={loading} error={error} />
    </div>
  );
}