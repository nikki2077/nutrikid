import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import './BMI.css'
import scale from './assets/images/scale.png';
import figure from './assets/images/bmi-figure.png';
import Recipe from './Recipe'

export default function BMI({ onNavigate }){
    const [result, setResult] = useState(null);
    const [bmi, setBmi] = useState(24.9); 
    const [status, setStatus] = useState('You’re Healthy');
      
    useEffect(() => {
        
    function handleBMIResult(data) {
        console.log('testing');
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
    }, [])

    return(
        <div className="bmi-page">
      <main className="bmi-content">
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

        <div className="bmi-wrapper">
            <iframe
            src="https://www.cdc.gov/healthyweight/bmi/calculator-widget.html"
            title="BMI Calculator for Child and Teen"
            style={{ width: '100%', height:'100%',border: 'none' }}
        ></iframe>
        </div>

        <div className='recipt-wrapper'>
              <h1>To explore personalized meal suggestions based on your child’s nutritional needs: </h1>
              <br />
                <button className="recipe-button" onClick={() => onNavigate('recipe')}>
                    Try recipe recommendation
                </button>
        </div>
        
      </main>
    </div>
    )
}

