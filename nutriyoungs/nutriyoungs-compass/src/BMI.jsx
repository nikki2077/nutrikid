import React, { useState, useEffect } from 'react';
import './App.css';
import './BMI.css';
import bmiImage from './assets/images/bmi.png';

export default function BMI({ onNavigate }) {
  const [bmi, setBmi] = useState(24.9);
  const [status, setStatus] = useState('You’re Healthy');

  useEffect(() => {
    function handleBMIResult(data) {
      if (data && data.bmi && data.status) {
        setBmi(data.bmi);
        setStatus(data.status);
      } else {
        console.error('Invalid data received', data);
      }
    }

    const handleMessage = (event) => {
      if (event.origin.startsWith("https://www.cdc.gov")) {
        handleBMIResult(event.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="bmi-page">
      <div className="intro-section">
        <h1 className="bmi-title">BMI Calculator</h1>
        <p className="bmi-intro">
          Streamlined, intuitive interface, quickly assess a child's body mass index (BMI) to ensure their growth is on track and they maintain a healthy weight for their age and activity level. Get instant calculations by entering basic information like age, height, and weight.
        </p>
      </div>

      <main className="bmi-content">
        <div className="bmi-wrapper-info-container">
          <div className="bmi-wrapper">
            <iframe
              src="https://www.cdc.gov/healthyweight/bmi/calculator-widget.html"
              title="BMI Calculator for Child and Teen"
              className="bmi-iframe"
            ></iframe>
            <img src={bmiImage} alt="bmi-image" className="bmi-image" />
          </div>

          <section className="bmi-info">
            <article className="bmi-article">
              <h2>What is BMI?</h2>
              <p>BMI, or Body Mass Index, is a ratio of weight to height (kg/m²) often used as a proxy for body fatness. However, it doesn't directly measure body fat; it estimates weight excess. Studies confirm BMI is broadly indicative of body fat levels, as gauged by more precise methods like underwater weighing and DXA scans.</p>
              <br />
              <a href="https://www.cdc.gov/obesity/downloads/bmiforpactitioners.pdf" target="_blank" rel="noopener noreferrer">Read more</a>
            </article>
            <article className="bmi-article">
              <h2>Why use BMI?</h2>
              <p>BMI is a quick, easy method to estimate body fat based on height and weight. It's not a precise measurement of body fat but correlates well with health risks associated with obesity. It's widely used for population health assessments.</p>
              <br />
              <a href="https://www.cdc.gov/obesity/downloads/bmiforpactitioners.pdf" target="_blank" rel="noopener noreferrer">Read more</a>
            </article>
          </section>
        </div>

        <div className='recipt-wrapper'>
          <h1>To explore personalized meal suggestions based on your child’s nutritional needs:</h1>
          <br />
          <div className='recipt-button-wrapper'>
          <button className="recipe-button" onClick={() => {
              onNavigate('recipe');
              setTimeout(() => {
                  window.scrollTo(0, 0);
              }, 0);  
          }}>
              Try recipe recommendation
          </button>

          </div>
        </div>
        <div className="bmi-buttons">
          <button className="btn-secondary mb-2" onClick={() => onNavigate('landing')}>Back to Home</button>
          <button className="btn-primary" onClick={() => window.scrollTo(0,0)}>To the Top</button>
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
      </main>
    </div>
  );
}
