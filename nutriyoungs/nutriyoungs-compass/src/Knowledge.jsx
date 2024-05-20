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
          <div style={{
            width: '100%',
            height: '100%',
            paddingTop: 150,
            paddingBottom: 100,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 135,
            display: 'inline-flex'
          }}>
            <div style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              display: 'inline-flex'
            }}>
              <div style={{
                color: '#4CAF50',
                fontSize: 64,
                fontFamily: 'Manrope',
                fontWeight: '700',
                wordWrap: 'break-word'
              }}>NutriTrends
              </div>
              <div style={{
                color: '#666666',
                fontSize: 24,
                fontFamily: 'Manrope',
                fontWeight: '700',
                wordWrap: 'break-word'
              }}>Child Nutrition Tracker
              </div>
            </div>
            <div style={{
              flex: '1 1 0',
              color: '#4CAF50',
              fontSize: 24,
              fontFamily: 'Manrope',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>Convergence of technology and nutrition, offering dynamic visualizations that transform raw data into
              actionable insights. Navigates the complexities of their children's dietary trends across various age
              groups. Enhances understanding, and fosters proactive engagement with children's nutritional health,
              ensuring that developmental food choices are informed, strategic, and adaptable to changing nutritional
              needs.
            </div>
          </div>
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
            </select>
            <p>This trend chart shows the recent trend changes in your child's BMI. At the same time, auxiliary lines
              are used to help you understand the difference between the standard values.</p>
          </div>
          <div className="graph-container">
            {renderGraph()}
          </div>
        </div>
        <div className="trends-info">
          <article className="bmi-article">
            <h2>Fruits and Vegetables: Nature's Nutrient Powerhouses for All Ages</h2>
            <p>Picture fruits as vibrant packages of nutrition, essential for every stage of life. Take strawberries, for instance they are rich in vitamin C, a key player in immune function and collagen production, promoting skin health and wound healing. Apples, on the other hand, are a crunchy source of fiber, aiding digestion and heart health. These nutritional gems offer a delicious and convenient way to support overall well-being.</p>
            <br />
            <p>Think of vegetables as the unsung heroes of the culinary world, boasting an array of vitamins and minerals vital for optimal health. Broccoli, for example, is packed with vitamin K, essential for blood clotting and bone health, while carrots provide beta-carotene, a precursor to vitamin A, crucial for vision and skin integrity.</p>
            <br />
            <p>By incorporating a variety of vegetables into meals, both adults and children can reap the diverse benefits of these nutritional powerhouses.</p>
            <button className="readmore-button" onClick={() => window.open("https://www.betterhealth.vic.gov.au/health/healthyliving/fruit-and-vegetables", "_blank")}>
                Read more ↗
              </button>
          </article>

          <article className="bmi-article">
            <h2>Unlocking the Benefits of Fruits and Veggies for Vitality</h2>
            <p>Energy Boosters: Harness the natural energy of fruits and vegetables to fuel your busy lifestyle. From bananas providing a quick source of potassium for muscle function to cucumber slices offering refreshing hydration, these nutrient-dense foods are your ally in maintaining sustained energy levels throughout the day.</p>
            <br />
            <p>Immune Support: Strengthen your body's defenses with the immune-boosting properties of fruits and vegetables. Rich in antioxidants like vitamin C and beta-carotene, they help fortify your immune system, protecting against infections and promoting overall health. </p>
            <br />
            <p>Cognitive Enhancement: Elevate your mental performance with the brain-boosting nutrients found in fruits and vegetables. Omega-3 fatty acids in avocados support cognitive function and mood regulation, while vitamin E in spinach protects against oxidative stress. </p>
            <button className="readmore-button" onClick={() => window.open("https://www.safefruitsandveggies.com/blog/unlock-healthier-you-in-2024-embrace-the-power-of-fruits-and-vegetables/#:~:text=Elevate%20your%20energy%20levels%20with,the%20pitfalls%20of%20added%20sugars.", "_blank")}>
                Read more ↗
              </button>
          </article>
        </div>
      </div>
      <div className="bmi-buttons">
                <button className="btn-secondary mb-2" onClick={() => {
                    onNavigate('landing');
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                    }, 0);  
                }}>Back to Home</button>
                <button className="btn-primary" onClick={() => window.scrollTo(0, 0)}>To the Top</button>
      </div>
      <div className='user-journey'>
      <div className='next-wrapper'>
        <div className='next-title'>What is next?</div>
        <div className='next-text'>
          Having explored how technology can simplify understanding your child's dietary trends, let's see how you can easily track their growth. Our next feature offers a quick way to assess your child's BMI—simply enter their age, height, and weight for instant results.
        </div>
      </div>
      <div className='feature-wrapper'>
        <div className='feature-title'>BMI Check</div>
        <div className='feature-button'>
          <button className="try-it-btn" onClick={() => {
            onNavigate('bmi');
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 0);
          }}>Calculate BMI Now</button>
        </div>
      </div>
    </div>
           

    </div>
  );
}
