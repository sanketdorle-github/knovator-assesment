import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Job Fetcher Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Monitor your job import logs and browse imported job listings in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link href="/logs" className="group">
            <div className="card p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Import Logs</h3>
              <p className="text-gray-600 text-sm text-balance">
                View all import execution logs and statistics
              </p>
            </div>
          </Link>

          <Link href="/jobs" className="group">
            <div className="card p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Browse Jobs</h3>
              <p className="text-gray-600 text-sm text-balance">
                Explore all imported job listings
              </p>
            </div>
          </Link>

          <Link href="/search" className="group">
            <div className="card p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Search Jobs</h3>
              <p className="text-gray-600 text-sm text-balance">
                Find jobs by keywords in titles and descriptions
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}