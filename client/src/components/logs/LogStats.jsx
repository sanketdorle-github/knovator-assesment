import { Card, CardContent } from '../ui/Card';

export const LogStats = ({ logs }) => {
  const stats = {
    totalLogs: logs.length,
    totalJobs: logs.reduce((sum, log) => sum + log.totalFetched, 0),
    successfulImports: logs.filter(log => log.failedJobs === 0).length,
    failedImports: logs.filter(log => log.failedJobs > 0).length,
  };

  const StatItem = ({ label, value, color = 'text-gray-900' }) => (
    <div className="text-center">
      <div className={`text-2xl font-bold ${color}`}>{value.toLocaleString()}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Import Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem label="Total Logs" value={stats.totalLogs} />
          <StatItem label="Total Jobs" value={stats.totalJobs} />
          <StatItem 
            label="Successful" 
            value={stats.successfulImports} 
            color="text-green-600" 
          />
          <StatItem 
            label="With Errors" 
            value={stats.failedImports} 
            color="text-red-600" 
          />
        </div>
      </CardContent>
    </Card>
  );
};