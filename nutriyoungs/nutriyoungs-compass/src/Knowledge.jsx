import React, { useState } from 'react';
import Vege from './Vege';
import Fruit from './Fruit';
import FruitVege from './Fruit-Vege';
import FoodConsumption from './FoodConsumption';
import './Knowledge.css';
import Overweight from './Overweight';
import Macro from './Macro';

export default function Knowledge() {
  const [selectedGraph, setSelectedGraph] = useState('vege');

  const renderGraph = () => {
    switch (selectedGraph) {
      case 'vege':
        return <Vege />;
      case 'fruit':
        return <Fruit />;
      case 'fruitVege':
        return <FruitVege />;
      case 'foodConsumption':
        return <FoodConsumption />;
      case 'overweight':
        return <Overweight />;
      case 'macro':
        return <Macro />
      default:
        return null;
    }
  };

  return (
    <div className='knowledge'>
       <div className='wrapper'>
        <div className='graph-header'>
                <h1>Trends</h1>
            </div>
            <br />
            <div className='graph-wrapper'>
                <div className="dropdown-container">
                <label htmlFor="graph-select">Choose a graph:</label>
                <select id="graph-select" onChange={(e) => setSelectedGraph(e.target.value)}>
                <option value="vege">Vegetable Consumption</option>
                <option value="fruit">Fruit Consumption</option>
                <option value="fruitVege">Fruit & Vegetable Consumption</option>
                <option value="foodConsumption">Food Consumption</option>
                <option value="overweight">Obesity and Overweight</option>
                <option value="macro">Macro Nutrient</option>
                </select>
        </div>
        {renderGraph()}
            </div>
       </div>
    </div>
  );
}
