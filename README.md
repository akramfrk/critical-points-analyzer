# Critical Points Analyzer

A powerful web application built with Next.js and React for analyzing functions of two variables, finding critical points, and classifying them as local maxima, local minima, or saddle points.

## Features

- Input any function of two variables (x and y)
- Automatic calculation of critical points
- Classification of each critical point (local minimum, local maximum, or saddle point)
- Interactive 3D visualization of the function surface
- 2D contour plot visualization with critical points highlighted
- Modern UI built with shadcn/ui components

## Mathematical Capabilities

The application can:

- Parse complex mathematical expressions using math.js
- Calculate partial derivatives to find critical points
- Analyze the Hessian matrix to classify critical points
- Visualize both the function and its critical points in both 2D and 3D

## How to Use

1. Enter a function of two variables (x and y) in the input field
   - Example: `x^2 + y^2` for a parabola
   - Example: `x^2 - y^2` for a saddle
   - Example: `sin(x) * cos(y)` for a more complex surface

2. Click "Analyze Function" to find critical points

3. View the results:
   - A table listing all critical points and their classifications
   - 3D surface plot of the function with critical points highlighted
   - 2D contour plot of the function with critical points highlighted

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Technologies Used

- Next.js and React for the frontend framework
- TypeScript for type safety
- math.js for mathematical operations and parsing
- Plotly.js for 2D and 3D visualizations
- shadcn/ui for the modern UI components
- Tailwind CSS for styling
