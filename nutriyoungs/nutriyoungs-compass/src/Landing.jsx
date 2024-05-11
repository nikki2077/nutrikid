import React from 'react';
import './Landing.css';
import backgroundImage from './assets/images/bg.png';
import bmiGrid from './assets/images/bmiGrid.png';
import dynamicGrid from './assets/images/dynamicGrid.png';
import trackingGrid from './assets/images/trackingGrid.png';
import recipeGrid from './assets/images/recipeGrid.png';
import groceriedGrid from './assets/images/groceriesGrid.png';
import arrow from './assets/images/arrow.png';

export default function Landing({ onNavigate }) {
  return (
    <div className="landing">
      <div className="hero-section">
        <div className="hero-left">
          <h1 className="title">NutriYoungs Compass</h1>
          <h2 className="sub-title">Empower Nutritional Choices, Foster Healthy Growth,
          Enlighten with Affordable Solutions.</h2>
          <br />
          <button className="cta-button" onClick={() => onNavigate('bmi')}>
            Let's set sail
          </button>
        </div>
        <div className="hero-right">
          <img src={backgroundImage} alt="background-image" className="background-image" />
        </div>
      </div>

      <div className='arrow'>
        <img src={arrow} alt="arrow-image" className="arrow-image" />
        </div>

      <div className="info-section">
        <h2>Some things you should know about children’s nutrition</h2>
        <h3>The question that every parent is most concerned about: How to scientifically and happily keep children healthy at a cost-effective manner?</h3>
        <div className="info-content">
          <div className="info-grid">

            <div className='left-grid'>
              <div className="grid-item">
                <img src={bmiGrid} alt="Description" className="grid-image" />
                <h2 className="grid-title">Calculate BMI</h2>
                <h3 className="grid-subtitle">Body Mass Index & Nutrition advice</h3>
                <p className="grid-description">Calculate children's Body Mass Index (BMI) and receive personalized nutrition advice.</p>
                <div className="button-container">
                  <button className='try-it-btn' onClick={() => onNavigate('bmi')}>Try it</button>
                </div>
              </div>

              <div className="grid-item">
                <img src={recipeGrid} alt="Description" className="grid-image" />
                <h2 className="grid-title">Recipe Recommendation</h2>
                <h3 className="grid-subtitle">Healthy & Tasty nutritional recipes</h3>
                <p className="grid-description">Suggest healthy and tasty recipes tailored to children's nutritional needs and family preferences.</p>
                <div className="button-container">
                  <button className='try-it-btn' onClick={() => onNavigate('recipe')}>
                    Try it
                  </button>
                </div>
              </div>

              <div className="grid-item">
                <img src={groceriedGrid} alt="Description" className="grid-image" />
                <h2 className="grid-title">Groceries Receipt Insights</h2>
                <h3 className="grid-subtitle">Shopping</h3>
                <p className="grid-description">Empower to make informed decisions about grocery spending and nutritional choices through advanced analysis of grocery receipts.</p>
                <div className="button-container">
                  <button className='try-it-btn'>Try it</button>
                </div>
              </div>
            </div>

            <div className='right-grid'>
              <div className="grid-item">
                <img src={dynamicGrid} alt="Description" className="grid-image" />
                <h2 className="grid-title">Dynamic Visualisations</h2>
                <h3 className="grid-subtitle">Nutritional intake & Food consumption proportion</h3>
                <p className="grid-description">Display trends in children's nutritional intake, and food consumption proportion for various age categories.</p>
                <div className='btn-wrapper'>
                  <div className="button-container">
                    <button className='try-it-btn' onClick={() => onNavigate('knowledge')}>Try it</button>
                  </div>
                </div>
              </div>
              <div className="grid-item">
                <img src={trackingGrid} alt="Description" className="grid-image" />
                <h2 className="grid-title">Food Recognition & Nutrient Tracking</h2>
                <h3 className="grid-subtitle">Recognition & Tracking</h3>
                <p className="grid-description">Take pictures, food information will be presented without any obstruction. "Click-click" and learn about the food data you're most curious about.</p>
                <div className="button-container">
                  <button className='try-it-btn' onClick={() => onNavigate('upload')}>Try it</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bmi-buttons">
        <button className="btn-primary" onClick={() => window.scrollTo(0, 0)}>To the Top</button>
      </div>
    </div>
  );
}
