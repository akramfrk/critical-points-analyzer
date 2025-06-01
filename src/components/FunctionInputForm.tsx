import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from './ui/card';

interface FunctionInputFormProps {
  onSubmit: (functionExpression: string) => void;
  isLoading: boolean;
}

const FunctionInputForm: React.FC<FunctionInputFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const [functionExpression, setFunctionExpression] = useState<string>('x^2 + y^2');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (functionExpression.trim()) {
      onSubmit(functionExpression);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-3">
        <div className="flex items-center">
          <Label 
            htmlFor="function-input" 
            className="text-sm font-medium flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
            </svg>
            Enter a function of two variables (x, y)
          </Label>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-slate-500 dark:text-slate-400 font-mono">f(x,y) =&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
          <Input
            id="function-input"
            value={functionExpression}
            onChange={(e) => setFunctionExpression(e.target.value)}
            placeholder="x^2 + y^2"
            className="font-mono pl-20 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
            style={{ paddingLeft: '9rem' }}
            aria-label="Function expression"
            title="Enter a mathematical expression with variables x and y"
          />
        </div>
        
        <Card className="p-4 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <h3 className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Supported operations</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-semibold block mb-1.5">Basic operations:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Addition">+</span>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Subtraction">-</span>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Multiplication">*</span>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Division">/</span>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Exponentiation">^</span>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Parentheses for grouping">()</span>
                  </div>
                </div>
                <div>
                  <span className="font-semibold block mb-1.5">Trigonometric:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Sine function">sin(x)</span>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Cosine function">cos(y)</span>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Tangent function">tan()</span>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Secant function">sec()</span>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Cosecant function">csc()</span>
                    <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Cotangent function">cot()</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-semibold block mb-1.5">Exponential & Logarithmic:</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Exponential function">exp(x)</span>
                  <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Natural logarithm">log(x)</span>
                  <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Base-10 logarithm">log10(x)</span>
                  <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Square root">sqrt(x)</span>
                </div>
              </div>
              <div>
                <span className="font-semibold block mb-1.5">Other functions:</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Absolute value">abs(x)</span>
                  <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Floor function">floor(x)</span>
                  <span className="font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs" title="Ceiling function">ceil(x)</span>
                </div>
              </div>
            </div>
            
            <div>
              <span className="font-semibold block mb-1.5">Examples:</span>
              <div className="grid grid-cols-1 gap-1">
                <div className="font-mono bg-white dark:bg-slate-700 px-2 py-1 rounded text-xs">x^2 + y^2</div>
                <div className="font-mono bg-white dark:bg-slate-700 px-2 py-1 rounded text-xs">sin(x) * cos(y)</div>
                <div className="font-mono bg-white dark:bg-slate-700 px-2 py-1 rounded text-xs">exp(-(x^2 + y^2))</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
            </svg>
            Analyze Function
          </span>
        )}
      </Button>
    </form>
  );
};

export default FunctionInputForm;
