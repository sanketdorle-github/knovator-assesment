'use client';

import { JobSearch } from "@/components/jobs/JobSearch";

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Jobs</h1>
          <p className="text-gray-600">Find jobs by keywords in titles and descriptions</p>
        </div>
        
        <JobSearch />
      </div>
    </div>
  );
}