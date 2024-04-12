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
       <section className="bmi-info">
          <article className="bmi-article">
            <h2>Fruits and Vegetables: Nature's Nutrient Powerhouses for All Ages:</h2>
            <p>Picture fruits as vibrant packages of nutrition, essential for every stage of life. Take strawberries, for instance they are rich in vitamin C, a key player in immune function and collagen production, promoting skin health and wound healing. Apples, on the other hand, are a crunchy source of fiber, aiding digestion and heart health. These nutritional gems offer a delicious and convenient way to support overall well-being.</p>
            <br />
            <br />
            <p>Think of vegetables as the unsung heroes of the culinary world, boasting an array of vitamins and minerals vital for optimal health. Broccoli, for example, is packed with vitamin K, essential for blood clotting and bone health, while carrots provide beta-carotene, a precursor to vitamin A, crucial for vision and skin integrity. By incorporating a variety of vegetables into meals, both adults and children can reap the diverse benefits of these nutritional powerhouses.</p>
           
          </article>
          <article className="bmi-article">
            <h2>Unlocking the Benefits of Fruits and Veggies for Vitality:</h2>
            <p>Energy Boosters: Harness the natural energy of fruits and vegetables to fuel your busy lifestyle. From bananas providing a quick source of potassium for muscle function to cucumber slices offering refreshing hydration, these nutrient-dense foods are your ally in maintaining sustained energy levels throughout the day.</p>
            <br /><br />
            <p>Immune Support: Strengthen your body's defenses with the immune-boosting properties of fruits and vegetables. Rich in antioxidants like vitamin C and beta-carotene, they help fortify your immune system, protecting against infections and promoting overall health. Incorporating a colorful array of produce, such as oranges, berries, and leafy greens, ensures a diverse range of immune-supporting nutrients.</p>
           <br /><br /> <p>Cognitive Enhancement: Elevate your mental performance with the brain-boosting nutrients found in fruits and vegetables. Omega-3 fatty acids in avocados support cognitive function and mood regulation, while vitamin E in spinach protects against oxidative stress, preserving brain health. By prioritizing a diet rich in these brain-boosting foods, both adults and children can optimize cognitive function and mental well-being.</p>
           <br /><br />
           <h2>Gain Insights from the Data?</h2>
          </article>


        </section>
        <div className='graph-header'>
        
            </div>
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
