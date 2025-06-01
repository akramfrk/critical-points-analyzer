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
  selectedPoint?: CriticalPoint | null;
}

const Plot3D: React.FC<Plot3DProps> = ({ functionExpression, criticalPoints, selectedPoint = null }) => {
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
      } as any;

      // Create scatter plots for critical points by type
      const plots = [surfacePlot];

      // Helper function to check if a point is the selected one
      const isSelected = (point: CriticalPoint): boolean => {
        if (!selectedPoint) return false;
        return (
          point.x === selectedPoint.x && 
          point.y === selectedPoint.y && 
          point.z === selectedPoint.z && 
          point.type === selectedPoint.type
        );
      };

      // Group points by type
      const minima = criticalPoints.filter(p => p.type === 'Local minimum');
      const maxima = criticalPoints.filter(p => p.type === 'Local maximum');
      const saddles = criticalPoints.filter(p => p.type === 'Saddle point');
      const undetermined = criticalPoints.filter(p => p.type === 'Undetermined');

      // Add minima points (blue)
      if (minima.length > 0) {
        // If we have a selected point of this type, separate it from the rest
        const selectedMinimum = selectedPoint?.type === 'Local minimum' ? minima.filter(p => isSelected(p)) : [];
        const regularMinima = selectedMinimum.length > 0 ? minima.filter(p => !isSelected(p)) : minima;
        
        // Add regular minima
        if (regularMinima.length > 0) {
          plots.push({
            type: 'scatter3d',
            mode: 'markers',
            x: regularMinima.map(p => p.x),
            y: regularMinima.map(p => p.y),
            z: regularMinima.map(p => p.z),
            marker: {
              size: 6,
              color: 'rgb(31, 119, 180)',
              line: {
                color: 'rgb(255, 255, 255)',
                width: 1
              }
            },
            name: 'Local Minima'
          });
        }
        
        // Add selected minimum with different styling
        if (selectedMinimum.length > 0) {
          plots.push({
            type: 'scatter3d',
            mode: 'markers',
            x: selectedMinimum.map(p => p.x),
            y: selectedMinimum.map(p => p.y),
            z: selectedMinimum.map(p => p.z),
            marker: {
              size: 10,
              color: 'rgb(31, 119, 180)',
              symbol: 'circle',
              line: {
                color: 'rgb(255, 255, 255)',
                width: 2
              },
              opacity: 1
            },
            name: 'Selected Minimum',
            showlegend: false
          });
        }
      }

      // Add maxima points (red)
      if (maxima.length > 0) {
        // If we have a selected point of this type, separate it from the rest
        const selectedMaximum = selectedPoint?.type === 'Local maximum' ? maxima.filter(p => isSelected(p)) : [];
        const regularMaxima = selectedMaximum.length > 0 ? maxima.filter(p => !isSelected(p)) : maxima;
        
        // Add regular maxima
        if (regularMaxima.length > 0) {
          plots.push({
            type: 'scatter3d',
            mode: 'markers',
            x: regularMaxima.map(p => p.x),
            y: regularMaxima.map(p => p.y),
            z: regularMaxima.map(p => p.z),
            marker: {
              size: 6,
              color: 'rgb(214, 39, 40)',
              line: {
                color: 'rgb(255, 255, 255)',
                width: 1
              }
            },
            name: 'Local Maxima'
          });
        }
        
        // Add selected maximum with different styling
        if (selectedMaximum.length > 0) {
          plots.push({
            type: 'scatter3d',
            mode: 'markers',
            x: selectedMaximum.map(p => p.x),
            y: selectedMaximum.map(p => p.y),
            z: selectedMaximum.map(p => p.z),
            marker: {
              size: 10,
              color: 'rgb(214, 39, 40)',
              symbol: 'circle',
              line: {
                color: 'rgb(255, 255, 255)',
                width: 2
              },
              opacity: 1
            },
            name: 'Selected Maximum',
            showlegend: false
          });
        }
      }

      // Add saddle points (yellow)
      if (saddles.length > 0) {
        // If we have a selected point of this type, separate it from the rest
        const selectedSaddle = selectedPoint?.type === 'Saddle point' ? saddles.filter(p => isSelected(p)) : [];
        const regularSaddles = selectedSaddle.length > 0 ? saddles.filter(p => !isSelected(p)) : saddles;
        
        // Add regular saddle points
        if (regularSaddles.length > 0) {
          plots.push({
            type: 'scatter3d',
            mode: 'markers',
            x: regularSaddles.map(p => p.x),
            y: regularSaddles.map(p => p.y),
            z: regularSaddles.map(p => p.z),
            marker: {
              size: 6,
              color: 'rgb(255, 187, 0)',
              line: {
                color: 'rgb(255, 255, 255)',
                width: 1
              }
            },
            name: 'Saddle Points'
          });
        }
        
        // Add selected saddle with different styling
        if (selectedSaddle.length > 0) {
          plots.push({
            type: 'scatter3d',
            mode: 'markers',
            x: selectedSaddle.map(p => p.x),
            y: selectedSaddle.map(p => p.y),
            z: selectedSaddle.map(p => p.z),
            marker: {
              size: 10,
              color: 'rgb(255, 187, 0)',
              symbol: 'circle',
              line: {
                color: 'rgb(255, 255, 255)',
                width: 2
              },
              opacity: 1
            },
            name: 'Selected Saddle Point',
            showlegend: false
          });
        }
      }

      // Add undetermined points (gray)
      if (undetermined.length > 0) {
        // If we have a selected point of this type, separate it from the rest
        const selectedUndetermined = selectedPoint?.type === 'Undetermined' ? undetermined.filter(p => isSelected(p)) : [];
        const regularUndetermined = selectedUndetermined.length > 0 ? undetermined.filter(p => !isSelected(p)) : undetermined;
        
        // Add regular undetermined points
        if (regularUndetermined.length > 0) {
          plots.push({
            type: 'scatter3d',
            mode: 'markers',
            x: regularUndetermined.map(p => p.x),
            y: regularUndetermined.map(p => p.y),
            z: regularUndetermined.map(p => p.z),
            marker: {
              size: 5,
              color: 'rgb(150, 150, 150)',
              line: {
                color: 'rgb(255, 255, 255)',
                width: 1
              }
            },
            name: 'Undetermined'
          });
        }
        
        // Add selected undetermined with different styling
        if (selectedUndetermined.length > 0) {
          plots.push({
            type: 'scatter3d',
            mode: 'markers',
            x: selectedUndetermined.map(p => p.x),
            y: selectedUndetermined.map(p => p.y),
            z: selectedUndetermined.map(p => p.z),
            marker: {
              size: 9,
              color: 'rgb(150, 150, 150)',
              symbol: 'circle',
              line: {
                color: 'rgb(255, 255, 255)',
                width: 2
              },
              opacity: 1
            },
            name: 'Selected Undetermined',
            showlegend: false
          });
        }
      }

      // Set plot data with proper typing
      setPlotData(plots);
    } catch (err) {
      setError(`Error generating 3D plot: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  }, [functionExpression, criticalPoints, selectedPoint]);

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-slate-300 dark:border-slate-600 border-t-blue-500 mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Rendering 3D visualization...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
        <div className="text-center max-w-md p-6">
          <svg className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">Visualization Error</h3>
          <p className="text-red-600 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="relative h-[600px]">
        <div className="absolute inset-0 flex items-center justify-center">
          {isLoading && <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>}
          {error && <div className="text-red-500">{error}</div>}
        </div>
        <Plot
          data={plotData}
          layout={{
            title: `3D Surface Plot: ${functionExpression}`,
            autosize: true,
            height: 600,
            scene: {
              xaxis: { title: 'X', gridcolor: '#f1f5f9', zerolinecolor: '#cbd5e1' },
              yaxis: { title: 'Y', gridcolor: '#f1f5f9', zerolinecolor: '#cbd5e1' },
              zaxis: { title: 'Z', gridcolor: '#f1f5f9', zerolinecolor: '#cbd5e1' },
              camera: { eye: { x: 1.5, y: 1.5, z: 1 } },
              aspectratio: { x: 1, y: 1, z: 0.8 }
            },
            margin: { l: 50, r: 50, b: 65, t: 90, pad: 4 },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
          } as any}
          useResizeHandler={true}
          config={{
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d']
          }}
          className="w-full h-full"
        />
      </div>
      <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
              <span>Minima</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
              <span>Maxima</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
              <span>Saddle Points</span>
            </div>
          </div>
          <div>
            <span className="italic">Tip: Click and drag to rotate, scroll to zoom</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plot3D;
