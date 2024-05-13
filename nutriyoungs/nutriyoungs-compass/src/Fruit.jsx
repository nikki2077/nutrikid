import React from 'react';
import Plot from 'react-plotly.js';
import data from './assets/data/fv_json.json';

const Fruit = () => {
  const traceBoys = {
    x: data.map(row => row['Age group (years)']),
    y: data.map(row => row['Boys_no_fruit_consumption']),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Boys',
    marker: { color: 'blue' },
  };

  const traceGirls = {
    x: data.map(row => row['Age group (years)']),
    y: data.map(row => row['Girls_no_fruit_consumption']),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Girls',
    marker: { color: 'orange' }, 
  };

  const layout = {
    title: 'Children Not Meeting Daily Fruit Intake Percentage, 2021',
    xaxis: {
      title: 'Age Group (years)',
    },
    yaxis: {
      title: 'Percentage of Children',
    },
    legend: {
      orientation: 'h',
      yanchor: 'bottom',
      y: 1.02,
      xanchor: 'right',
      x: 1,
    },
    width: 1000,
    height: 600,
    autosize: false,
  };

  return (
    <Plot
      data={[traceBoys, traceGirls]}
      layout={layout}
    />
  );
};

export default Fruit;
