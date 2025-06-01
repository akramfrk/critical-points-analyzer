"use client";

import { useState } from 'react';
import FunctionInputForm from '@/components/FunctionInputForm';
import CriticalPointsTable from '@/components/CriticalPointsTable';
import Plot3D from '@/components/Plot3D';
import Plot2D from '@/components/Plot2D';
import { findCriticalPoints } from '@/lib/math/criticalPoints';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

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
  const [selectedPoint, setSelectedPoint] = useState<CriticalPoint | null>(null);

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto pt-35 pb-10 px-4 max-w-7xl">
        <header className="mb-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Critical Points Analyzer
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Analyze functions of two variables to find and classify critical points as local maxima, minima, or saddle points
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 13a1 1 0 112 0 1 1 0 01-2 0zm1-8a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 7c0 1.293-.595 2.1-1.336 2.667-.355.276-.664.448-.664.833a1 1 0 11-2 0c0-1.195.777-1.86 1.45-2.338A1 1 0 0110 7z" clipRule="evenodd" />
                </svg>
                Function Input
              </h2>
              <FunctionInputForm onSubmit={handleAnalyzeFunction} isLoading={isLoading} />
              
              {error && (
                <div className="mt-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg flex items-start">
                  <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>{error}</div>
                </div>
              )}

              {functionExpression && criticalPoints && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                  <h3 className="text-lg font-medium mb-3 text-blue-700 dark:text-blue-400">Analysis Results</h3>
                  <div className="space-y-2">
                    <p className="flex flex-wrap items-baseline">
                      <span className="font-medium mr-2 text-slate-700 dark:text-slate-300">Function:</span> 
                      <span className="font-mono bg-white dark:bg-slate-700 px-2 py-1 rounded text-sm">f(x,y) = {functionExpression}</span>
                    </p>
                    <p className="flex items-baseline">
                      <span className="font-medium mr-2 text-slate-700 dark:text-slate-300">Critical Points Found:</span> 
                      <span className="font-mono bg-white dark:bg-slate-700 px-2 py-1 rounded text-sm">{criticalPoints.length}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Examples section */}
            <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                Example Functions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div onClick={() => handleAnalyzeFunction('x^2 + y^2')} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-2 text-xs">1</span>
                  <InlineMath math="x^2 + y^2" />
                </div>
                <div onClick={() => handleAnalyzeFunction('x^2 - y^2')} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-2 text-xs">2</span>
                  <InlineMath math="x^2 - y^2" />
                </div>
                <div onClick={() => handleAnalyzeFunction('sin(x) * cos(y)')} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-2 text-xs">3</span>
                  <InlineMath math="\sin{x} \cdot \cos{y}" />
                </div>
                <div onClick={() => handleAnalyzeFunction('exp(-(x^2 + y^2))')} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-2 text-xs">4</span>
                  <InlineMath math="\exp{-(x^2 + y^2)}" />
                </div>
                <div onClick={() => handleAnalyzeFunction('x^3 - 3*x*y^2')} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-2 text-xs">5</span>
                  <InlineMath math="x^3 - 3x \cdot y^2" />
                </div>
                <div onClick={() => handleAnalyzeFunction('x^4 + y^4 - x^2 - y^2')} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-2 text-xs">6</span>
                  <InlineMath math="x^4 + y^4 - x^2 - y^2" />
                </div>
                <div onClick={() => handleAnalyzeFunction('log(x^2 + y^2 + 1)')} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-2 text-xs">7</span>
                  <InlineMath math="\log{(x^2 + y^2 + 1)}" />
                </div>
                <div onClick={() => handleAnalyzeFunction('x^2 * exp(-x^2-y^2)')} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-2 text-xs">8</span>
                  <InlineMath math="x^2 \cdot \exp{(-x^2-y^2)}" />
                </div>
                <div onClick={() => handleAnalyzeFunction('sin(x^2 + y^2)')} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-2 text-xs">9</span>
                  <InlineMath math="\sin{(x^2 + y^2)}" />
                </div>
                <div onClick={() => handleAnalyzeFunction('x^2*y - y^3')} className="cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mr-2 text-xs">10</span>
                  <InlineMath math="x^2y - y^3" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="h-96 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 dark:border-slate-700 border-t-blue-500 mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-400">Analyzing function and computing critical points...</p>
                </div>
              </div>
            ) : functionExpression ? (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Critical Points
                  </h2>
                  <CriticalPointsTable 
                    criticalPoints={criticalPoints} 
                    functionExpression={functionExpression} 
                    onPointSelect={setSelectedPoint}
                    selectedPoint={selectedPoint}
                  />
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                    Visualizations
                  </h2>
                  <Tabs defaultValue="3d" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="3d" className="text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        3D Surface Plot
                      </TabsTrigger>
                      <TabsTrigger value="2d" className="text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                        </svg>
                        2D Contour Plot
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="3d" className="mt-0">
                      <Plot3D 
                        functionExpression={functionExpression} 
                        criticalPoints={criticalPoints}
                        selectedPoint={selectedPoint}
                      />
                    </TabsContent>
                    <TabsContent value="2d" className="mt-0">
                      <Plot2D 
                        functionExpression={functionExpression} 
                        criticalPoints={criticalPoints}
                        selectedPoint={selectedPoint}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-8 text-center">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-slate-300 dark:text-slate-600 mb-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">Enter a function to analyze</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Input a function of two variables (x and y) in the panel on the left and click &quot;Analyze Function&quot; to see critical points and visualizations.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400 py-4">
          <p>Critical Points Analyzer - A mathematical tool for analyzing functions of two variables</p>
        </footer>
      </div>
    </div>
  );
}
