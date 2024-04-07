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
       <section className="bmi-info">
          <article className="bmi-article">
            <h2>What is BMI?</h2>
            <p>Body mass index (BMI) is a measure of weight adjusted for height, calculated as weight in kilograms divided by the square of height in meters (kg/m2 ). Although BMI is often considered an indicator of body fatness, it is a surrogate measure of body fat because it measures excess weight rather than excess fat. Despite this fact, studies have shown that BMI is correlated to more direct measures of body fat, such as underwater weighing and dual energy x-ray absorptiometry.</p>
            <br />
            <a href="https://www.cdc.gov/obesity/downloads/bmiforpactitioners.pdf" target="_blank" rel="noopener noreferrer">Read more</a>
          </article>
          <article className="bmi-article">
            <h2>Why use BMI?</h2>
            <p>BMI is a simple, inexpensive, and noninvasive surrogate measure of body fat. In contrast to other methods, BMI relies solely on height and weight and with access to the proper equipment, individuals can have their BMI routinely measured and calculated with reasonable accuracy. Furthermore, studies have shown that BMI levels correlate with body fat and with future health risks. High BMI predicts future morbidity and death. Therefore, BMI is an appropriate measure for screening for obesity and its health risks. Lastly, the widespread and longstanding application of BMI contributes to its utility at the population level. Its use has resulted in an increased availability of published population data that allows public health professionals to make comparisons across time, regions, and population subgroups.</p>
            <br />
            <a href="https://www.cdc.gov/obesity/downloads/bmiforpactitioners.pdf" target="_blank" rel="noopener noreferrer">Read more</a>
          </article>
        </section>
    </div>
  );
}
