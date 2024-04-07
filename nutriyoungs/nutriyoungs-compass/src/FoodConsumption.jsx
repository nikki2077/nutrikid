import React from 'react';
import Plot from 'react-plotly.js';
import foodData from './assets/data/fc_json.json'

const FoodConsumption = () => {
  const ageGroups = ['2-3', '4-8', '9-13', '14-18', '19-30'];
  
  const traces = ageGroups.map(group => ({
    x: foodData.map(row => row['Food type']),
    y: foodData.map(row => row[group]),
    type: 'bar',
    name: group
  }));

const layout = {
  title: 'Food Consumption by Age Group',
  barmode: 'group',
  xaxis: {
    title: 'Food Type',
    tickangle: 45, 
    tickfont: {
      size: 10, 
      color: 'black'
    }
  },
  yaxis: { title: 'Consumption (%)' },
  width: 1000,
  height: 600,
  autosize: false,
  margin: {
    l: 50,
    r: 50,
    b: 200, 
    t: 100,
    pad: 4
  },
};


  return <Plot data={traces} layout={layout} />;
};

export default FoodConsumption;
