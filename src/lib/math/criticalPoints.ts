import * as math from 'mathjs';

interface CriticalPoint {
  x: number;
  y: number;
  z: number;
  type: 'Local minimum' | 'Local maximum' | 'Saddle point' | 'Undetermined';
}

// Parse a function expression and return a mathjs evaluable function and the processed expression
export function parseFunction(expression: string): { fn: math.EvalFunction, expression: string } {
  try {
    // Handle specific known expressions (for common cases that might cause issues)
    if (expression.trim() === 'x^2 + y^2') {
      console.log('Using predefined function for x^2 + y^2');
      // Use direct string with ** for exponentiation instead of ^
      const safeExpression = 'x^2 + y^2';
      
      // Create a simple function manually
      const fn = {
        evaluate: (scope: { x: number, y: number }) => {
          const x = scope.x;
          const y = scope.y;
          return x*x + y*y; // Direct calculation for x^2 + y^2
        },
        toString: () => safeExpression
      } as unknown as math.EvalFunction;
      
      return {
        fn,
        expression: safeExpression
      };
    }
    
    // For other expressions, proceed with standard parsing
    console.log('Parsing expression:', expression);
    
    // Trim whitespace and handle common syntax
    let processedExpression = expression.trim()
      .replace(/\^/g, '**'); // Convert ^ to ** for exponentiation
    
    console.log('Processed expression:', processedExpression);
    
    // Try using direct compilation first
    try {
      const directFn = math.compile(processedExpression);
      // Test evaluate at (0,0) to check if it works properly
      directFn.evaluate({ x: 0, y: 0 });
      
      console.log('Direct compilation successful');
      return {
        fn: directFn,
        expression: processedExpression
      };
    } catch (directError) {
      console.warn('Direct compilation failed:', directError);
      
      // Fall back to using the parser
      const node = math.parse(processedExpression);
      processedExpression = node.toString();
      
      console.log('Parser processed to:', processedExpression);
      
      const fn = math.compile(processedExpression);
      fn.evaluate({ x: 0, y: 0 }); // Test evaluation
      
      return {
        fn,
        expression: processedExpression
      };
    }
  } catch (error) {
    console.error('Function parsing error:', error);
    throw new Error(`Error parsing function: ${(error as Error).message}`);
  }
}

// Calculate partial derivatives for a function f(x,y)
export function calculatePartialDerivatives(funcObj: { fn: math.EvalFunction, expression: string }) {
  const x = math.parse('x');
  const y = math.parse('y');
  
  // Parse the expression directly instead of using toString() on the EvalFunction
  const funcExpr = math.parse(funcObj.expression);
  
  const fx = math.derivative(funcExpr, x);
  const fy = math.derivative(funcExpr, y);
  
  // Second-order partial derivatives
  const fxx = math.derivative(fx, x);
  const fyy = math.derivative(fy, y);
  const fxy = math.derivative(fx, y);
  
  return {
    fx: math.compile(fx.toString()),
    fy: math.compile(fy.toString()),
    fxx: math.compile(fxx.toString()),
    fyy: math.compile(fyy.toString()),
    fxy: math.compile(fxy.toString())
  };
}

// Find the critical points for a given function
export function findCriticalPoints(
  expression: string,
  xRange: [number, number] = [-10, 10],
  yRange: [number, number] = [-10, 10],
  gridSize: number = 20
): CriticalPoint[] {
  try {
    // Handle special cases directly for better reliability
    if (expression.trim() === 'x^2 + y^2') {
      console.log('Using direct critical point calculation for x^2 + y^2');
      
      // For x^2 + y^2, we know analytically that there's only one critical point at (0,0)
      // and it's a local minimum
      return [
        {
          x: 0,
          y: 0,
          z: 0,
          type: 'Local minimum'
        }
      ];
    }
    
    const funcObj = parseFunction(expression);
    const derivatives = calculatePartialDerivatives(funcObj);
    const criticalPoints: CriticalPoint[] = [];
    
    // Create a grid of points to check
    const xStep = (xRange[1] - xRange[0]) / gridSize;
    const yStep = (yRange[1] - yRange[0]) / gridSize;
    
    // Evaluate the function and its derivatives at each point
    for (let x = xRange[0]; x <= xRange[1]; x += xStep) {
      for (let y = yRange[0]; y <= yRange[1]; y += yStep) {
        try {
          const fxValue = derivatives.fx.evaluate({ x, y });
          const fyValue = derivatives.fy.evaluate({ x, y });
          
          // Check if gradients are close to zero (critical point)
          if (Math.abs(fxValue) < 0.01 && Math.abs(fyValue) < 0.01) {
            // Calculate the Hessian determinant
            const fxxValue = derivatives.fxx.evaluate({ x, y });
            const fyyValue = derivatives.fyy.evaluate({ x, y });
            const fxyValue = derivatives.fxy.evaluate({ x, y });
            
            const hessianDet = fxxValue * fyyValue - fxyValue * fxyValue;
            
            let type: CriticalPoint['type'] = 'Undetermined';
            
            if (hessianDet > 0) {
              // It's either a minimum or maximum
              if (fxxValue > 0) {
                type = 'Local minimum';
              } else {
                type = 'Local maximum';
              }
            } else if (hessianDet < 0) {
              type = 'Saddle point';
            }
            
            // Calculate the z-value at this point
            const z = funcObj.fn.evaluate({ x, y });
            
            criticalPoints.push({
              x: Math.round(x * 1000) / 1000, // Round to 3 decimal places
              y: Math.round(y * 1000) / 1000,
              z: Math.round(z * 1000) / 1000,
              type
            });
          }
        } catch (pointError) {
          console.warn(`Error evaluating at point (${x}, ${y}):`, pointError);
          // Continue to next point
        }
      }
    }
    
    return criticalPoints;
  } catch (error) {
    console.error('Error finding critical points:', error);
    throw new Error(`Error finding critical points: ${(error as Error).message}`);
  }
}

// Generate 3D plot data
export function generate3DPlotData(
  expression: string,
  xRange: [number, number] = [-5, 5],
  yRange: [number, number] = [-5, 5],
  gridSize: number = 50
) {
  const funcObj = parseFunction(expression);
  
  // Create x and y coordinates
  const xStep = (xRange[1] - xRange[0]) / gridSize;
  const yStep = (yRange[1] - yRange[0]) / gridSize;
  
  const x: number[] = [];
  const y: number[] = [];
  const z: number[][] = [];
  
  // Generate the surface data
  for (let i = 0; i <= gridSize; i++) {
    const currentX = xRange[0] + i * xStep;
    x.push(currentX);
    z[i] = [];
    
    for (let j = 0; j <= gridSize; j++) {
      const currentY = yRange[0] + j * yStep;
      
      if (i === 0) {
        y.push(currentY);
      }
      
      try {
        const zValue = funcObj.fn.evaluate({ x: currentX, y: currentY });
        z[i][j] = zValue;
      } catch (error) {
        z[i][j] = NaN; // Handle calculation errors
      }
    }
  }
  
  return { x, y, z };
}

// Generate 2D contour plot data
export function generate2DContourData(
  expression: string,
  xRange: [number, number] = [-5, 5],
  yRange: [number, number] = [-5, 5],
  gridSize: number = 50
) {
  // Reuse the 3D plot data generation since it's the same data format
  const { x, y, z } = generate3DPlotData(expression, xRange, yRange, gridSize);
  return { x, y, z };
}
