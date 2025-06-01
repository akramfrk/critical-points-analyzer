import React from 'react';
import { Card } from '@/components/ui/card';

export default function PurposePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl pt-35">
        {/* Mathematical Quote Section */}
        <div className="mb-12 border-l-4 border-slate-400 dark:border-slate-600 pl-6 py-2 italic">
          <p className="text-slate-700 dark:text-slate-300 font-serif text-xl mb-2">
            &ldquo;Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.&rdquo;
          </p>
          <p className="text-right text-sm text-slate-500 dark:text-slate-400">
            — Linus Torvalds
          </p>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Project Information
        </h1>
        
        <Card className="mb-8 p-6 border border-slate-200 dark:border-slate-700 shadow-md transition-all">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Developer</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                This project was developed by <span className="font-medium text-blue-600 dark:text-blue-400">FERKIOUI Akram</span>, a passionate computer science student at the National Higher School of Advanced Technologies (ENSTA). As a dedicated programmer with an interest in mathematical visualization and web development, this project represents the intersection of theoretical knowledge and practical implementation skills.                
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Academic Context</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                This application was created for the <span className="font-medium">Analysis 4</span> subject, taught by:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Mr. NESRAOUI Riyadh</li>
                <li>Mme. TARGUI Nabila</li>
              </ul>
              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                The project was undertaken with the goal of earning additional points in the subject while applying mathematical concepts in a practical and interactive way. It represents the application of multivariable calculus principles studied in Analysis 4, particularly focusing on critical point identification and classification.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Technical Implementation</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The Critical Points Analyzer was built using modern web technologies including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Next.js and React for the frontend framework</li>
                <li>Tailwind CSS for responsive styling</li>
                <li>Math.js for mathematical expression parsing and evaluation</li>
                <li>Plotly.js for interactive 2D and 3D visualizations</li>
                <li>KaTeX for mathematical notation rendering</li>
              </ul>
              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                The development process involved implementing robust error handling mechanisms and optimizing the user interface for both educational clarity and visual appeal.
              </p>
            </div>
          </div>
        </Card>

        <footer className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400 py-4 border-t border-slate-200 dark:border-slate-700">
          <p>© {new Date().getFullYear()} Critical Points Analyzer - Created by FERKIOUI Akram</p>
        </footer>
      </div>
    </div>
  );
}
