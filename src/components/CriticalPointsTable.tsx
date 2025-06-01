import React from 'react';
import { Separator } from '@/components/ui/separator';

interface CriticalPoint {
  x: number;
  y: number;
  z: number;
  type: 'Local minimum' | 'Local maximum' | 'Saddle point' | 'Undetermined';
}

interface CriticalPointsTableProps {
  criticalPoints: CriticalPoint[];
  functionExpression: string;
}

const CriticalPointsTable: React.FC<CriticalPointsTableProps> = ({
  criticalPoints,
  functionExpression
}) => {
  if (criticalPoints.length === 0) {
    return (
      <div className="rounded-md border p-6 mt-4">
        <h3 className="text-lg font-medium">No critical points found</h3>
        <p className="text-sm text-gray-500 mt-2">
          No critical points were found for the function f(x,y) = {functionExpression} in the search range.
          Try modifying the function or expanding the search range.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border p-4 mt-4">
      <h3 className="text-lg font-medium mb-2">Critical Points</h3>
      <p className="text-sm text-gray-500 mb-4">
        For function f(x,y) = {functionExpression}
      </p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Point (x, y)</th>
              <th scope="col" className="px-6 py-3">Value f(x,y)</th>
              <th scope="col" className="px-6 py-3">Classification</th>
            </tr>
          </thead>
          <tbody>
            {criticalPoints.map((point, index) => (
              <tr 
                key={index} 
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-mono">
                  ({point.x}, {point.y})
                </td>
                <td className="px-6 py-4 font-mono">
                  {point.z}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    point.type === 'Local minimum' ? 'bg-blue-100 text-blue-800' : 
                    point.type === 'Local maximum' ? 'bg-red-100 text-red-800' : 
                    point.type === 'Saddle point' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {point.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CriticalPointsTable;
