import React from 'react';
import { Card } from '@/components/ui/card';

export default function PurposePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Purpose of Critical Points Analyzer
        </h1>
        
        <Card className="mb-8 p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Our Mission</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                [Content will be provided later]
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Educational Impact</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                [Content will be provided later]
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Future Development</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                [Content will be provided later]
              </p>
            </div>
          </div>
        </Card>

        <footer className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400 py-4 border-t border-slate-200 dark:border-slate-700">
          <p>© {new Date().getFullYear()} Critical Points Analyzer - Created for educational purposes</p>
        </footer>
      </div>
    </div>
  );
}
