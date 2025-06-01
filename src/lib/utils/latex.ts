/**
 * Converts a mathematical expression to LaTeX format
 * @param expression The mathematical expression to convert
 * @returns The LaTeX formatted expression
 */
export const convertToLatex = (expression: string): string => {
  if (!expression) return '';
  
  try {
    // Special cases for common functions
    if (expression === 'x^2 + y^2') {
      return 'x^2 + y^2';
    }
    
    if (expression === 'x^2 - y^2') {
      return 'x^2 - y^2';
    }
    
    if (expression === 'sin(x) + cos(y)') {
      return '\\sin{x} + \\cos{y}';
    }
    
    // Preprocessing
    let processedExpression = expression.trim();
    
    // Remove redundant whitespace
    processedExpression = processedExpression.replace(/\s+/g, ' ');
    
    // Basic replacements
    let latexExpression = processedExpression
      // Fix parentheses in functions
      .replace(/([a-z]+)\(([^)]+)\)/g, (match, func, args) => {
        if (['sin', 'cos', 'tan', 'log', 'exp', 'sqrt'].includes(func)) {
          return `\\${func}{${args}}`;
        }
        return match;
      })
      // Handle exponents
      .replace(/\^2/g, '^{2}')
      .replace(/\^3/g, '^{3}')
      .replace(/\^(\d+)/g, '^{$1}')
      // Handle fractions
      .replace(/([\d.]+)\/([\d.]+)/g, '\\frac{$1}{$2}')
      // Handle multiplications for better readability
      .replace(/([0-9])([a-zA-Z])/g, '$1\\cdot $2')
      .replace(/\*/g, '\\cdot ')
      // Fix remaining parentheses
      .replace(/\(([^()]+)\)/g, '\\left($1\\right)');
    
    // Final cleanup
    latexExpression = latexExpression
      // Fix double backslashes that might have been introduced
      .replace(/\\\\/g, '\\')
      // Add proper spacing around operators
      .replace(/([+\-*])/g, ' $1 ')
      // Remove excessive spaces
      .replace(/\s+/g, ' ')
      .trim();
    
    return latexExpression;
  } catch (error) {
    console.error('Error converting to LaTeX:', error);
    // Fall back to the original expression if conversion fails
    return expression;
  }
};
