import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const FruitVege = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      const apiEndpoint = 'https://la7baxdjxk.execute-api.us-east-1.amazonaws.com/dev/data';

      fetch(apiEndpoint)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(responseData => {

              const bodyData = JSON.parse(responseData.body);
              setData(bodyData);
          })
          .catch(error => console.error('Error fetching data:', error));
  }, []);

  const traceBoys = {
    x: data.map(row => row['Age group (years)']),
    y: data.map(row => row['Boys_no_combined_consumption']),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Boys',
    marker: { color: 'blue' },
  };

  const traceGirls = {
    x: data.map(row => row['Age group (years)']),
    y: data.map(row => row['Girls_no_combined_consumption']),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Girls',
    marker: { color: 'red' },
  };

  const layout = {
    title: 'Children Not Meeting Daily Fruit & Vegetable Intake Percentage, 2021',
    xaxis: { title: 'Age Group (years)' },
    yaxis: { title: 'Percentage of Children' },
    width: 1200,
    height: 800,
    autosize: false,
    legend: {
      orientation: 'h',
      yanchor: 'bottom',
      y: -0.3,
      xanchor: 'center',
      x: 0.5
    },
    width: 1000,
    height: 600,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4
    },
    hovermode: 'closest'
  };
  return data.length > 0 ? (
      <Plot data={[traceBoys, traceGirls]} layout={layout} />
  ) : (
      <div>Loading...</div>
  );
};

export default FruitVege;