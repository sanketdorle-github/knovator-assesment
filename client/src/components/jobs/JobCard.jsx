'use client';

import Link from 'next/link';
import { Card, CardContent } from '../ui/Card';
import { formatDate, truncateText } from '../../lib/utils';

export const JobCard = ({ job }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 text-balance line-clamp-2">
            {job.title}
          </h3>
        </div>
        
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Company:</span>
            <span className="ml-2">{job.company}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Location:</span>
            <span className="ml-2">{job.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Type:</span>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
              {job.type}
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4 line-clamp-3">
          {truncateText(job.description, 120)}
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Imported: {formatDate(job.imported_at)}
          </div>
          <Link 
            href={`/jobs/${job._id}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};