"use client";

import { useState } from 'react';
import FunctionInputForm from '@/components/FunctionInputForm';
import CriticalPointsTable from '@/components/CriticalPointsTable';
import Plot3D from '@/components/Plot3D';
import Plot2D from '@/components/Plot2D';
import { findCriticalPoints } from '@/lib/math/criticalPoints';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface CriticalPoint {
  x: number;
  y: number;
  z: number;
  type: 'Local minimum' | 'Local maximum' | 'Saddle point' | 'Undetermined';
}

export default function Home() {
  const [functionExpression, setFunctionExpression] = useState<string>('');
  const [criticalPoints, setCriticalPoints] = useState<CriticalPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeFunction = (expression: string) => {
    setIsLoading(true);
    setError(null);
    setFunctionExpression(expression);

    try {
      // Find critical points of the function
      const points = findCriticalPoints(expression);
      setCriticalPoints(points);
    } catch (err) {
      setError(`Error analyzing function: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Critical Points Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze functions of two variables to find and classify critical points
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 p-6 border rounded-lg shadow-sm bg-card">
          <h2 className="text-xl font-semibold mb-4">Function Input</h2>
          <FunctionInputForm onSubmit={handleAnalyzeFunction} isLoading={isLoading} />
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          {functionExpression && criticalPoints && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Analysis Results</h3>
              <p className="text-sm mb-1">
                <span className="font-medium">Function:</span> f(x,y) = {functionExpression}
              </p>
              <p className="text-sm">
                <span className="font-medium">Critical Points Found:</span> {criticalPoints.length}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {functionExpression && (
            <>
              <CriticalPointsTable 
                criticalPoints={criticalPoints} 
                functionExpression={functionExpression} 
              />
              
              <div className="mt-6">
                <Tabs defaultValue="3d" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="3d">3D Surface Plot</TabsTrigger>
                    <TabsTrigger value="2d">2D Contour Plot</TabsTrigger>
                  </TabsList>
                  <TabsContent value="3d">
                    {functionExpression && (
                      <Plot3D 
                        functionExpression={functionExpression} 
                        criticalPoints={criticalPoints} 
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="2d">
                    {functionExpression && (
                      <Plot2D 
                        functionExpression={functionExpression} 
                        criticalPoints={criticalPoints} 
                      />
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
