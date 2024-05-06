import React, { useState } from 'react';
import Vege from './Vege';
import Fruit from './Fruit';
import FruitVege from './Fruit-Vege';
import FoodConsumption from './FoodConsumption';
import './Knowledge.css';
import Overweight from './Overweight';
import Macro from './Macro';
import './App.css';

export default function Knowledge({ onNavigate }) {
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
        return <Macro />;
      default:
        return null;
    }
  };

  return (
    <div className="knowledge">
      <div className="wrapper">
        <div className="intro-section">
          <h1 className="bmi-title">Trends</h1>
          <p className="bmi-intro">
            Convergence of technology and nutrition, offering dynamic visualizations that transform raw data into actionable insights. Navigates the complexities of their children's dietary trends across various age groups. Enhances understanding, and fosters proactive engagement with children's nutritional health, ensuring that developmental food choices are informed, strategic, and adaptable to changing nutritional needs.
          </p>
        </div>
        <div className="graph-wrapper">
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
          <div className="graph-container">
            {renderGraph()}
          </div>
        </div>
        <section className="trends-info">
          <article className="bmi-article">
            <h2>Fruits and Vegetables: Nature's Nutrient Powerhouses for All Ages:</h2>
            <p>Picture fruits as vibrant packages of nutrition, essential for every stage of life. Take strawberries, for instance, they are rich in vitamin C, a key player in immune function and collagen production, promoting skin health and wound healing.</p>
            <a href="..." target="_blank" rel="noopener noreferrer">Read more</a>
          </article>

          <article className="bmi-article">
            <h2>Unlocking the Benefits of Fruits and Veggies for Vitality:</h2>
            <p>Energy Boosters: Harness the natural energy of fruits and vegetables to fuel your busy lifestyle.</p>
            <a href="..." target="_blank" rel="noopener noreferrer">Read more</a>
          </article>
        </section>
      </div>
      <div className="bmi-buttons">
        <button className="btn-secondary mb-2" onClick={() => onNavigate('landing')}>Back to Home</button>
        <button className="btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>To the Top</button>
      </div>
    </div>
  );
}
