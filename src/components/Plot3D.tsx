import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { generate3DPlotData } from '@/lib/math/criticalPoints';
import { Layout } from 'plotly.js';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface CriticalPoint {
  x: number;
  y: number;
  z: number;
  type: 'Local minimum' | 'Local maximum' | 'Saddle point' | 'Undetermined';
}

interface Plot3DProps {
  functionExpression: string;
  criticalPoints: CriticalPoint[];
}

const Plot3D: React.FC<Plot3DProps> = ({ functionExpression, criticalPoints }) => {
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
        console.log('Creating 3D plot data manually for x^2 + y^2');
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
        const plotData = generate3DPlotData(functionExpression);
        x = plotData.x;
        y = plotData.y;
        z = plotData.z;
      }
      
      // Create the surface plot
      const surfacePlot = {
        type: 'surface',
        x,
        y,
        z,
        colorscale: 'Viridis',
        contours: {
          z: {
            show: true,
            usecolormap: true,
            highlightcolor: "#42f462",
            project: { z: true }
          }
        },
        name: `f(x,y) = ${functionExpression}`
      };

      // Create scatter plots for critical points by type
      const minima = criticalPoints.filter(p => p.type === 'Local minimum');
      const maxima = criticalPoints.filter(p => p.type === 'Local maximum');
      const saddles = criticalPoints.filter(p => p.type === 'Saddle point');
      const others = criticalPoints.filter(p => p.type === 'Undetermined');

      const plots = [surfacePlot];

      if (minima.length > 0) {
        plots.push({
          type: 'scatter3d',
          mode: 'markers',
          x: minima.map(p => p.x),
          y: minima.map(p => p.y),
          z: minima.map(p => p.z) as any,
          marker: {
            size: 6,
            color: 'blue',
            symbol: 'circle'
          },
          name: 'Local Minima'
        } as any);
      }

      if (maxima.length > 0) {
        plots.push({
          type: 'scatter3d',
          mode: 'markers',
          x: maxima.map(p => p.x),
          y: maxima.map(p => p.y),
          z: maxima.map(p => p.z) as any,
          marker: {
            size: 6,
            color: 'red',
            symbol: 'circle'
          },
          name: 'Local Maxima'
        } as any);
      }

      if (saddles.length > 0) {
        plots.push({
          type: 'scatter3d',
          mode: 'markers',
          x: saddles.map(p => p.x),
          y: saddles.map(p => p.y),
          z: saddles.map(p => p.z) as any,
          marker: {
            size: 6,
            color: 'yellow',
            symbol: 'circle'
          },
          name: 'Saddle Points'
        } as any);
      }

      if (others.length > 0) {
        plots.push({
          type: 'scatter3d',
          mode: 'markers',
          x: others.map(p => p.x),
          y: others.map(p => p.y),
          z: others.map(p => p.z) as any,
          marker: {
            size: 6,
            color: 'gray',
            symbol: 'circle'
          },
          name: 'Undetermined'
        } as any);
      }

      setPlotData(plots);
    } catch (err) {
      setError(`Error generating 3D plot: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  }, [functionExpression, criticalPoints]);

  if (isLoading) {
    return <div className="h-[500px] flex items-center justify-center">Loading 3D visualization...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 border border-red-200 rounded-md">{error}</div>;
  }

  return (
    <div className="mt-4 border rounded-md p-2">
      <Plot
        data={plotData}
        layout={{
          title: { text: `3D Surface Plot: f(x,y) = ${functionExpression}` },
          autosize: true,
          height: 600,
          scene: {
            xaxis: { title: { text: 'X' } },
            yaxis: { title: { text: 'Y' } },
            zaxis: { title: { text: 'Z' } },
            camera: {
              eye: { x: 1.5, y: 1.5, z: 1 }
            }
          },
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 50
          }
        } as Partial<Layout>}
        config={{ responsive: true }}
        className="w-full"
      />
    </div>
  );
};

export default Plot3D;
