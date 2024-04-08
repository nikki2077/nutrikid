import React from 'react';
import Plot from 'react-plotly.js';

const macronutrientsData = [
  {"Macronutrients":"Protein","2-3":56.8,"4-8":63.5,"9-13":80.1,"14-18":89.0},
  {"Macronutrients":"Total Fat","2-3":49.3,"4-8":59.3,"9-13":75.4,"14-18":80.7},
  {"Macronutrients":"Carbohydrate","2-3":180.9,"4-8":216.8,"9-13":256.1,"14-18":266.5}
];

const MacroNutrientCharts = () => {
  const ageGroups = ['2-3', '4-8', '9-13', '14-18'];
  const layout = {
    width: 1000,
    height: 600,
    grid: { rows: 2, columns: 2, pattern: 'independent' },
    annotations: [],
    legend: {
      orientation: 'h',
      y: -0.1 
    }
  };

  const plots = ageGroups.map((age, index) => {
    const values = macronutrientsData.map((nutrient) => nutrient[age]);
    const labels = macronutrientsData.map((nutrient) => nutrient.Macronutrients);

    layout.annotations.push({
      text: `Age ${age}`,
      x: index % 2 === 0 ? 0.2 : 0.85,
      xref: 'paper',
      y: index < 2 ? 1.15 : 0.5,
      yref: 'paper',
      showarrow: false,
      font: {
        size: 20,
        color: 'black'
      }
    });

    return {
      values,
      labels,
      type: 'pie',
      domain: {
        row: Math.floor(index / 2),
        column: index % 2
      },
      marker: {
        colors: ['#17BECF', '#FF7F0E', '#2CA02C'] 
      },
      textinfo: 'label+percent',
      hoverinfo: 'label+value'
    };
  });

  return <Plot data={plots} layout={layout} style={{ width: '100%', height: '100%' }} />;
};

export default MacroNutrientCharts;
