import { Card, CardContent } from '../ui/Card';

export const LogCard = ({ log }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (log) => {
    if (log.failedJobs > 0) return 'bg-red-100 text-red-800';
    if (log.newJobs > 0) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 truncate text-balance">
           import-{log.fileName || log.sourceUrl}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log)}`}>
            {log.failedJobs > 0 ? 'With Errors' : 'Successful'}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
          <div>
            <span className="font-medium">Total:</span> {log.totalFetched}
          </div>
          <div>
            <span className="font-medium">New:</span> {log.newJobs}
          </div>
          <div>
            <span className="font-medium">Updated:</span> {log.updatedJobs}
          </div>
          <div>
            <span className="font-medium">Failed:</span> {log.failedJobs}
          </div>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <div className="truncate">Source: {log.sourceUrl}</div>
          <div>Completed: {formatDate(log.completed_at)}</div>
        </div>

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
      </CardContent>
    </Card>
  );
};