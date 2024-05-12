import React from 'react';
import './Landing.css';
import backgroundImage from './assets/images/bg.png';
import bmiGrid from './assets/images/bmi-check.png';
import dynamicGrid from './assets/images/NutriTrends.png';
import trackingGrid from './assets/images/MealPlans.png';
import recipeGrid from './assets/images/NutriScan.png';
import groceriesGrid from './assets/images/SpendSmart.png';
import arrow from './assets/images/arrow.png';

export default function Landing({ onNavigate }) {
  return (
    <div className="landing">
      <div className="hero-section">
        <div className="hero-left">
          <h1 className="title">NutriYoungs Compass</h1>
          <h2 className="sub-title">Experience the future of dietary planning with our AI-driven family nutrition consultant—personalized, intelligent, and always caring.</h2>
          <br />
          <button className="cta-button" onClick={() => onNavigate('bmi')}>
            Explore Now <span className="cta-icon">↗</span>
          </button>
        </div>
        <div className="hero-right">
          <img src={backgroundImage} alt="background" className="hero-image" />
        </div>
      </div>

      <div className='arrow'>
        <img src={arrow} alt="arrow" className="arrow-image" />
      </div>

      <div className="info-section">
        <h2>Some things you should know about children’s nutrition</h2>
        <h3>The question that every parent is most concerned about: How to scientifically and happily keep children healthy at a cost-effective manner?</h3>
        <div className="info-content">
          <div className="info-grid">

            <div className="grid-item">
              <div className="grid-left">
                <img src={dynamicGrid} alt="NutriTrends" className="grid-image" />
              </div>
              <div className="grid-right">
                <h2 className="grid-title">NutriTrends</h2>
                <h3 className="grid-subtitle">Nutritional intake & Food consumption</h3>
                <button className="try-it-btn" onClick={() => {
                  onNavigate('knowledge');
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 0); }}>View Health Trends</button>
                <p className="grid-description">Display trends in children's nutritional intake, and food consumption proportion for various age categories.</p>
              </div>
            </div>

            <div className="grid-item">
              <div className="grid-left">
                <img src={bmiGrid} alt="BMI Check" className="grid-image" />
              </div>
              <div className="grid-right">
                <h2 className="grid-title">BMI Check</h2>
                <h3 className="grid-subtitle">Body Mass Index & Nutrition advice</h3>
                <button className="try-it-btn" onClick={() => {
                  onNavigate('bmi');
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 0); }}>Calculate BMI Now</button>
                <p className="grid-description">Calculate children's Body Mass Index (BMI) and receive personalized nutrition advice.</p>
              </div>
            </div>

            <div className="grid-item">
              <div className="grid-left">
                <img src={recipeGrid} alt="MealPlans" className="grid-image" />
              </div>
              <div className="grid-right">
                <h2 className="grid-title">MealPlans</h2>
                <h3 className="grid-subtitle">Healthy & Tasty nutritional recipes</h3>
                <button className="try-it-btn" onClick={() => {
                  onNavigate('recipts');
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 0); }}>Find Recipes</button>
                <p className="grid-description">Suggest healthy and tasty recipes tailored to children's nutritional needs and family preferences.</p>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-left">
                <img src={trackingGrid} alt="NutriScan" className="grid-image" />
              </div>
              <div className="grid-right">
                <h2 className="grid-title">NutriScan</h2>
                <h3 className="grid-subtitle">Recognition & Tracking</h3>
                <button className="try-it-btn" onClick={() => {
                  onNavigate('upload');
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 0); 
              }}>Snap & Discover</button>
                <p className="grid-description">"Click-click" and learn about the food data you’re most curious about.</p>
              </div>
            </div>
            <div className="grid-item">
              <div className="grid-left">
                <img src={groceriesGrid} alt="SpendSmart" className="grid-image" />
              </div>
              <div className="grid-right">
                <h2 className="grid-title">SpendSmart</h2>
                <h3 className="grid-subtitle">Shopping</h3>
                <button className="try-it-btn" onClick={() => {
                  onNavigate('recipt');              
                  setTimeout(() => {
                  window.scrollTo(0, 0);
              }, 0); }}>Analyze Receipts</button>
                <p className="grid-description">Empower to make informed decisions about grocery spending and nutritional choices from grocery receipts.</p>
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
