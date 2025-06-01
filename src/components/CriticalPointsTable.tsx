import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { convertToLatex } from '@/lib/utils/latex';

// Helper function to check if two points are the same (for selection highlighting)
const isSelectedPoint = (point: CriticalPoint, selectedPoint: CriticalPoint | null): boolean => {
  if (!selectedPoint) return false;
  return (
    point.x === selectedPoint.x && 
    point.y === selectedPoint.y && 
    point.z === selectedPoint.z && 
    point.type === selectedPoint.type
  );
};

interface CriticalPoint {
  x: number;
  y: number;
  z: number;
  type: 'Local minimum' | 'Local maximum' | 'Saddle point' | 'Undetermined';
}

interface CriticalPointsTableProps {
  criticalPoints: CriticalPoint[];
  functionExpression: string;
  onPointSelect?: (point: CriticalPoint | null) => void;
  selectedPoint?: CriticalPoint | null;
}

const CriticalPointsTable: React.FC<CriticalPointsTableProps> = ({
  criticalPoints,
  functionExpression,
  onPointSelect = () => {},
  selectedPoint = null
}) => {
  if (criticalPoints.length === 0) {
    return (
      <div className="rounded-lg p-6 border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-slate-300 dark:text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">No critical points found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            No critical points were found for the function <InlineMath math={`f(x,y) = ${convertToLatex(functionExpression)}`} /> in the search range.
            Try modifying the function or expanding the search range.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-md overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
              <TableHead className="font-semibold">Point (x, y)</TableHead>
              <TableHead className="font-semibold">Value f(x,y)</TableHead>
              <TableHead className="font-semibold">Classification</TableHead>
              <TableHead className="font-semibold w-20">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {criticalPoints.map((point, index) => (
              <TableRow 
                key={index} 
                className={`${index % 2 === 0 ? 'bg-white dark:bg-slate-900/50' : 'bg-slate-50/50 dark:bg-slate-800/30'} 
                  ${isSelectedPoint(point, selectedPoint) ? 'ring-2 ring-blue-500/50 dark:ring-blue-500/30 relative z-10' : ''}`}
              >
                <TableCell className="font-mono whitespace-nowrap">
                  ({point.x}, {point.y})
                </TableCell>
                <TableCell className="font-mono">
                  {point.z}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {point.type === 'Local minimum' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    {point.type === 'Local maximum' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    {point.type === 'Saddle point' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                      </svg>
                    )}
                    {point.type === 'Undetermined' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 7a3 3 0 01-2.977 3.07 1 1 0 00-.018.11A1 1 0 018 12v-2a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      point.type === 'Local minimum' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 
                      point.type === 'Local maximum' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 
                      point.type === 'Saddle point' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 
                      'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                    }`}>
                      {point.type}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <button 
                    className={`p-1.5 rounded-md transition-colors ${isSelectedPoint(point, selectedPoint) 
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500'}`}
                    title={isSelectedPoint(point, selectedPoint) ? "Hide in plot" : "Show in plot"}
                    onClick={() => {
                      if (isSelectedPoint(point, selectedPoint)) {
                        onPointSelect(null); // Deselect if already selected
                      } else {
                        onPointSelect(point); // Select this point
                      }
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      {isSelectedPoint(point, selectedPoint) ? (
                        // Selected point icon (eye with highlight)
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      ) : (
                        // Regular eye icon
                        <>
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </>
                      )}
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <h3 className="font-medium text-sm">Function Analysis</h3>
        </div>
        <div className="px-2 py-2 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800 overflow-x-auto">
          <BlockMath math={`f(x,y) = ${convertToLatex(functionExpression)}`} />
        </div>
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-4 px-4">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-100 dark:bg-blue-900/50 mr-2"></span>
          <span>Local Minimum</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-100 dark:bg-red-900/50 mr-2"></span>
          <span>Local Maximum</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-100 dark:bg-yellow-900/50 mr-2"></span>
          <span>Saddle Point</span>
        </div>
      </div>
    </div>
  );
};

export default CriticalPointsTable;
