import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import './BMI.css'
import scale from './assets/images/scale.png';
import figure from './assets/images/bmi-figure.png';

export default function BMI(){
    const [result, setResult] = useState(null);
    const [bmi, setBmi] = useState(24.9); 
    const [status, setStatus] = useState('You’re Healthy');

    useEffect(() => {
      const handleMessage = (event) => {
        if (event.origin === "https://www.cdc.gov") {
          console.log("Data received:", event.data);
          setResult(event.data);
        }
      };
  
      window.addEventListener("message", handleMessage);
  
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }, []);
    return(
        <div className="bmi-page">
      <main className="bmi-content">
        <section className="bmi-info">
          <article className="bmi-article">
            <h2>What is BMI?</h2>
            <p>Body mass index (BMI) is a measure of weight adjusted for height, calculated as weight in kilograms divided by the square of height in meters (kg/m2 ). Although BMI is often considered an indicator of body fatness, it is a surrogate measure of body fat because it measures excess weight rather than excess fat. Despite this fact, studies have shown that BMI is correlated to more direct measures of body fat, such as underwater weighing and dual energy x-ray absorptiometry.</p>
            <a href="https://www.cdc.gov/obesity/downloads/bmiforpactitioners.pdf" target="_blank" rel="noopener noreferrer">Read more</a>
          </article>
          <article className="bmi-article">
            <h2>Why use BMI?</h2>
            <p>BMI is a simple, inexpensive, and noninvasive surrogate measure of body fat. In contrast to other methods, BMI relies solely on height and weight and with access to the proper equipment, individuals can have their BMI routinely measured and calculated with reasonable accuracy. Furthermore, studies have shown that BMI levels correlate with body fat and with future health risks. High BMI predicts future morbidity and death. Therefore, BMI is an appropriate measure for screening for obesity and its health risks. Lastly, the widespread and longstanding application of BMI contributes to its utility at the population level. Its use has resulted in an increased availability of published population data that allows public health professionals to make comparisons across time, regions, and population subgroups.</p>
            <a href="https://www.cdc.gov/obesity/downloads/bmiforpactitioners.pdf" target="_blank" rel="noopener noreferrer">Read more</a>
          </article>
        </section>
        <aside className="bmi-wrapper">
            <iframe
            src="https://www.cdc.gov/healthyweight/bmi/calculator-widget.html"
            title="BMI Calculator for Child and Teen"
            style={{ width: '100%', border: 'none' }}
        ></iframe>

        <div className="bmi-calculator">
            <h1>BMI Calculator</h1>
            <div className="bmi-display">
                <div className="bmi-info">
                <h2>Body Mass Index (BMI)</h2>
                <div className="bmi-value">{bmi}</div>
                <div className="bmi-status">{status}</div>
                <div className="bmi-scale">
                    <img src={scale} alt="scale" />
                </div>
                </div>
                <div className="bmi-illustration">
                <img src={figure} alt="figure" />
                </div>
            </div>
            </div>
          
        </aside>
      </main>
    </div>
    )
}

