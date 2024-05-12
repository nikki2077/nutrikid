import React from 'react';
import Plot from 'react-plotly.js';
import data from './assets/data/overweight.json';
import './Overweight.css';

const Overweight = () => {
  const traces = [
    {
      x: data.map(item => item['Age group']),
      y: data.map(item => item['Overweight or obese']),
      type: 'bar',
      marker: { color: 'rgb(55, 83, 109)' },
    }
  ];

  const layout = {
    title: 'Percentage of Overweight or Obese by Age Group',
    xaxis: { title: 'Age Group' },
    yaxis: { title: 'Percentage Overweight or Obese', range: [0, Math.max(...data.map(item => item['Overweight or obese'])) + 5] },
    width: 1280,
    height: 720,
  };

  return (
    <div className='overweight-graph'>
      <Plot data={traces} layout={layout} />
    </div>
  );
};

export default Overweight;
