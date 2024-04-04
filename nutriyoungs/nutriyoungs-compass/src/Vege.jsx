import React from 'react';
import Plot from 'react-plotly.js';
import data from './assets/data/fv_json.json'

const Vege = () => {
    const trace1 = {
    x: data.map(row => row['Age group (years)']),
    y: data.map(row => row['Boys_no_vegetable_consumption']),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Boys',
    marker: { color: 'blue' },
  };

  const trace2 = {
    x: data.map(row => row['Age group (years)']),
    y: data.map(row => row['Girls_no_vegetable_consumption']),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Girls',
    marker: { color: 'orange' },
  };

  const layout = {
    title: 'Children Not Meeting Daily Vegetable Intake Percentage, 2021',
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
  };

  return (
    <Plot
      data={[trace1, trace2]}
      layout={layout}
    />
  );
};
  
  export default Vege;