import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="function-input">Enter a function of two variables (x, y)</Label>
        <Input
          id="function-input"
          value={functionExpression}
          onChange={(e) => setFunctionExpression(e.target.value)}
          placeholder="e.g., x^2 + y^2"
          className="font-mono"
        />
        <p className="text-sm text-gray-500">
          You can use standard mathematical expressions: +, -, *, /, ^, sin(), cos(), tan(), exp(), log(), etc.
        </p>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze Function'}
      </Button>
    </form>
  );
};

export default FunctionInputForm;
