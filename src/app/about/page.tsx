import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            About Critical Points Analyzer
          </h1>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 transition-all hover:shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Analyzer
            </Button>
          </Link>
        </div>

        {/* Introduction Section */}
        <Card className="mb-8 p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">What is the Critical Points Analyzer?</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The Critical Points Analyzer is a web-based mathematical tool designed to help students, educators, and mathematics enthusiasts analyze and visualize critical points of functions of two variables. 
                It identifies and classifies different types of critical points such as local maxima, local minima, and saddle points.
              </p>
            </div>
          </div>
        </Card>

        {/* How it Works */}
        <Card className="mb-8 p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">How it Works</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                When you enter a function expression, the analyzer:
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-slate-600 dark:text-slate-400">
                <li className="pl-2">Finds critical points by solving where the gradient <InlineMath math="\nabla f(x, y) = (0, 0)" /> </li>
                <li className="pl-2">Calculates the Hessian matrix at each critical point</li>
                <li className="pl-2">Determines the nature of each critical point based on the eigenvalues of the Hessian</li>
                <li className="pl-2">Generates 2D and 3D visualizations of the function around critical points</li>
              </ol>
            </div>
          </div>
        </Card>

        {/* Mathematical Background */}
        <Card className="mb-8 p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Mathematical Background</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Critical points of a function <InlineMath math="f(x, y)" /> are points where both partial derivatives equal zero:
              </p>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-md mb-4 text-center">
                <BlockMath math="\frac{\partial f}{\partial x} = 0 \quad \text{and} \quad \frac{\partial f}{\partial y} = 0" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                The classification of critical points is determined by analyzing the Hessian matrix:
              </p>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-md mb-4 text-center">
                <BlockMath math="H(f) = \begin{bmatrix} \frac{\partial^2 f}{\partial x^2} & \frac{\partial^2 f}{\partial x \partial y} \\ \frac{\partial^2 f}{\partial y \partial x} & \frac{\partial^2 f}{\partial y^2} \end{bmatrix}" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                  <h3 className="font-medium text-red-700 dark:text-red-400 mb-2 flex items-center">
                    <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span>
                    Local Maximum
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    All eigenvalues of the Hessian matrix are negative
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
                  <h3 className="font-medium text-green-700 dark:text-green-400 mb-2 flex items-center">
                    <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                    Local Minimum
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    All eigenvalues of the Hessian matrix are positive
                  </p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
                  <h3 className="font-medium text-amber-700 dark:text-amber-400 mb-2 flex items-center">
                    <span className="w-4 h-4 rounded-full bg-amber-500 mr-2"></span>
                    Saddle Point
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Eigenvalues of the Hessian matrix have mixed signs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Features */}
        <Card className="mb-8 p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-400">LaTeX rendering of mathematical expressions</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-400">Interactive 2D and 3D visualizations</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-400">Support for a wide range of mathematical functions</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-400">Automatic calculation and classification of critical points</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-400">Example functions with varying critical point behaviors</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* References */}
        <Card className="mb-8 p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">References</h2>
              <div className="grid grid-cols-1 gap-3">
                <a href="https://en.wikipedia.org/wiki/Critical_point_(mathematics)" className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  <span className="text-blue-600 dark:text-blue-400">Critical Points (Wikipedia)</span>
                </a>
                <a href="https://en.wikipedia.org/wiki/Hessian_matrix" className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  <span className="text-blue-600 dark:text-blue-400">Hessian Matrix (Wikipedia)</span>
                </a>
              </div>
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
