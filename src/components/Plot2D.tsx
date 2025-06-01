import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { generate2DContourData } from '@/lib/math/criticalPoints';
import { Layout } from 'plotly.js';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface CriticalPoint {
  x: number;
  y: number;
  z: number;
  type: 'Local minimum' | 'Local maximum' | 'Saddle point' | 'Undetermined';
}

interface Plot2DProps {
  functionExpression: string;
  criticalPoints: CriticalPoint[];
}

const Plot2D: React.FC<Plot2DProps> = ({ functionExpression, criticalPoints }) => {
  const [plotData, setPlotData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);

      let x: number[] = [];
      let y: number[] = [];
      let z: number[][] = [];

      // Handle specific common expressions with direct calculation
      if (functionExpression.trim() === 'x^2 + y^2') {
        // Create a simple parabola directly
        console.log('Creating 2D contour data manually for x^2 + y^2');
        const xRange = [-5, 5];
        const yRange = [-5, 5];
        const gridSize = 50;
        
        const xStep = (xRange[1] - xRange[0]) / gridSize;
        const yStep = (yRange[1] - yRange[0]) / gridSize;
        
        for (let i = 0; i <= gridSize; i++) {
          const currentX = xRange[0] + i * xStep;
          x.push(currentX);
          z[i] = [];
          
          for (let j = 0; j <= gridSize; j++) {
            const currentY = yRange[0] + j * yStep;
            
            if (i === 0) {
              y.push(currentY);
            }
            
            // Direct calculation for z = x^2 + y^2
            z[i][j] = currentX*currentX + currentY*currentY;
          }
        }
      } else {
        // Use the standard method for other expressions
        const plotData = generate2DContourData(functionExpression);
        x = plotData.x;
        y = plotData.y;
        z = plotData.z;
      }
      
      // Create the contour plot
      const contourPlot = {
        type: 'contour',
        x,
        y,
        z,
        colorscale: 'Viridis',
        contours: {
          coloring: 'heatmap',
          showlabels: true,
        },
        name: `f(x,y) = ${functionExpression}`
      } as any;

      // Create scatter plots for critical points by type
      const minima = criticalPoints.filter(p => p.type === 'Local minimum');
      const maxima = criticalPoints.filter(p => p.type === 'Local maximum');
      const saddles = criticalPoints.filter(p => p.type === 'Saddle point');
      const others = criticalPoints.filter(p => p.type === 'Undetermined');

      const plots = [contourPlot];

      if (minima.length > 0) {
        plots.push({
          type: 'scatter',
          mode: 'markers',
          x: minima.map(p => p.x),
          y: minima.map(p => p.y),
          marker: {
            size: 10,
            color: 'blue',
            symbol: 'circle',
            line: {
              color: 'white',
              width: 1
            }
          },
          name: 'Local Minima'
        } as any);
      }

      if (maxima.length > 0) {
        plots.push({
          type: 'scatter',
          mode: 'markers',
          x: maxima.map(p => p.x),
          y: maxima.map(p => p.y),
          marker: {
            size: 10,
            color: 'red',
            symbol: 'circle',
            line: {
              color: 'white',
              width: 1
            }
          },
          name: 'Local Maxima'
        } as any);
      }

      if (saddles.length > 0) {
        plots.push({
          type: 'scatter',
          mode: 'markers',
          x: saddles.map(p => p.x),
          y: saddles.map(p => p.y),
          marker: {
            size: 10,
            color: 'yellow',
            symbol: 'cross',
            line: {
              color: 'black',
              width: 1
            }
          },
          name: 'Saddle Points'
        } as any);
      }

      if (others.length > 0) {
        plots.push({
          type: 'scatter',
          mode: 'markers',
          x: others.map(p => p.x),
          y: others.map(p => p.y),
          marker: {
            size: 10,
            color: 'gray',
            symbol: 'circle',
            line: {
              color: 'white',
              width: 1
            }
          },
          name: 'Undetermined'
        } as any);
      }

      setPlotData(plots);
    } catch (err) {
      setError(`Error generating 2D plot: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  }, [functionExpression, criticalPoints]);

  if (isLoading) {
    return <div className="h-[400px] flex items-center justify-center">Loading 2D visualization...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 border border-red-200 rounded-md">{error}</div>;
  }

  return (
    <div className="mt-4 border rounded-md p-2">
      <Plot
        data={plotData}
        layout={{
          title: { text: `2D Contour Plot: f(x,y) = ${functionExpression}` },
          autosize: true,
          height: 500,
          xaxis: { title: { text: 'X' } },
          yaxis: { title: { text: 'Y' } },
          margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50
          }
        } as Partial<Layout>}
        config={{ responsive: true }}
        className="w-full"
      />
    </div>
  );
};

export default Plot2D;
