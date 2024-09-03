import React from 'react';
import Link from 'next/link';
import { FaEye, FaTrash } from 'react-icons/fa';

const TuitionList = ({ tuitions, onDelete }) => {
  if (!tuitions || tuitions.length === 0) {
    return <p className="text-center text-gray-500">No Tuition Records Found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tuitions.map((tuition) => {
          // Check if tuition is defined and has necessary properties
          const className = tuition?.className || 'No Class';
          const studentName = tuition?.studentName || 'No Name';
          const daysPerMonth = tuition?.daysPerMonth || 0;
          const attendance = tuition?.attendance || [];
          const daysGone = attendance.length;
          const daysLeft = daysPerMonth - daysGone;

          return (
            <div 
              key={tuition?._id || Math.random()}  // Use a unique key for each item
              className="bg-base-100 shadow-md rounded-lg border border-base-200 overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="bg-base-200 p-4 border-b border-base-300">
                <p className="text-sm text-base-content">{className}</p>
              </div>
              
              {/* Card Body */}
              <div className="p-4 flex-grow">
                <p className="text-sm text-base-content"><strong>Student:</strong> {studentName}</p>
                <div className="mt-2 flex justify-between items-center">
                  <p className="bg-base-300 text-base-content rounded-lg px-3 py-1 text-sm font-medium">
                    <strong>Days Attended:</strong> {daysGone}
                  </p>
                  <p className="bg-base-300 text-base-content rounded-lg px-3 py-1 text-sm font-medium">
                    <strong>Days Left:</strong> {daysLeft}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex border-t border-base-300 p-4 space-x-2">
                <Link href={`/tuition/${tuition?._id}`} className="btn btn-primary btn-sm flex items-center space-x-2">
                  <FaEye className="w-4 h-4" /> <span className="text-sm">View</span>
                </Link>
                <button 
                  onClick={() => onDelete(tuition?._id)} 
                  className="btn btn-error btn-sm flex items-center space-x-2"
                >
                  <FaTrash className="w-4 h-4" /> <span className="text-sm">Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TuitionList;
