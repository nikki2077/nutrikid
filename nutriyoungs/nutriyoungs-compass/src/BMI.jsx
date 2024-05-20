import React, { useState, useEffect } from 'react';
import './App.css';
import './BMI.css';
import boyImage from './assets/images/boy.png';
import girlImage from './assets/images/girl.png';


export default function BMI({ onNavigate }) {
  const [bmi, setBmi] = useState(24.9);
  const [status, setStatus] = useState('You’re Healthy');
  const [isBoy, setIsBoy] = useState(true); 


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

  const toggleGender = () => {
    setIsBoy(!isBoy); 
  };

  return (
    <div className="bmi-page">
      <div className="intro-section">
        <div style={{
          width: '100%',
          height: '100%',
          paddingTop: 100,
          paddingBottom: 100,
          justifyContent: 'center',
          alignItems: 'center',
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
            }}>BMI Check
            </div>
            <div style={{
              color: '#666666',
              fontSize: 24,
              fontFamily: 'Manrope',
              fontWeight: '700',
              wordWrap: 'break-word'
            }}>Kids Body Index
            </div>
          </div>
          <div style={{
            flex: '1 1 0',
            color: '#4CAF50',
            fontSize: 24,
            fontFamily: 'Manrope',
            fontWeight: '400',
            wordWrap: 'break-word'
          }}>Streamlined, intuitive interface, quickly assess a child's body mass index (BMI) to ensure their growth is
            on track and they maintain a healthy weight for their age and activity level. Get instant calculations by
            entering basic information like age, height, and weight.
          </div>
        </div>
      </div>

      <main className="bmi-content">
        <div className="bmi-wrapper-info-container">
          <div className="bmi-wrapper">
            <iframe
                src="https://www.cdc.gov/healthyweight/bmi/calculator-widget.html"
                title="BMI Calculator for Child and Teen"
                className="bmi-iframe"
            ></iframe>
            <div className="bmi-article">
              <h2>Why It Matters?</h2>
              <h4>Age and Gender-specific</h4>
              <h5> Unlike adults, a child's BMI is evaluated against age and gender-specific percentile charts to
                account for their growth patterns and developmental stages.</h5>
              <br/><h4>Health Screening Tool</h4>
              <h5>BMI helps identify potential weight-related health risks early on, allowing for timely
                interventions.</h5>
              <br/><h4>Track Growth Patterns</h4>
              <h5>Regular tracking of BMI over time helps ensure your child is growing healthily. Changes in their
                growth trajectory can prompt discussions with healthcare providers to adopt necessary dietary adjustments and activity levels.</h5>
              <br /><h2>Encouraging Healthy Habits</h2>
              <h5>It's important to support your child with balanced nutrition and regular physical activity, regardless of their current BMI. Engage in ongoing health conversations and consult with healthcare professionals to tailor wellness strategies that fit your child’s needs.</h5>

              <br /><br /><br /><br /><br /><br />
            </div>
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
      </main>

      <main className="bmi-content">
        <div className="bmi-wrapper-info-container">
          <div className="bmi-wrapper" >
  
            <div className="bmi-article">
              <h2>Understanding BMI Percentiles for Children and Teens</h2>
              <h5>Body Mass Index (BMI) is a critical tool used to assess whether a child is growing healthily. After calculating your child's BMI based on their weight and height, it is expressed as a percentile.</h5>
              <br />
              <h2>Why Percentiles?</h2>
              <h4>Age and Gender-Specific</h4>
              <h5> Children's bodies change rapidly as they grow. BMI percentiles take into account these changes by comparing your child’s BMI to that of other children in the same age group and gender.</h5>
              
              <br /><h4>Growth Tracking</h4>
              <h5>Using the percentile, you can track the size and growth patterns of your child over time relative to their peers, ensuring they are developing healthily.</h5>
              <br /><h2>BMI-for-Age Categories</h2>
              <h5>The BMI-for-age percentile is used to categorize your child’s weight status into one of the following groups:</h5>
              <br /><h4>Underweight</h4>
              <h5>Less than the 5th percentile. This suggests that your child weighs less than what is typically considered healthy compared to their peers.</h5>
              <br /><h4>Healthy Weight</h4>
              <h5>From the 5th percentile to less than the 85th percentile. This range indicates a healthy weight that supports normal growth and development</h5>
             <br /> <h4>Overweight</h4>
              <h5>From the 85th to less than the 95th percentile. This indicates that your child is heavier than what is ideal for their age and height.</h5>
              <br /><h4>Obesity</h4>
              <h5>Equal to or greater than the 95th percentile. This signals that your child's weight is significantly higher than what is recommended for their age and height.</h5>
            </div>

            <div>
            <button onClick={toggleGender} className="gender-toggle-button">
                Change to {isBoy ? "Girls" : "Boys"}
              </button>
              <img src={isBoy ? boyImage : girlImage} alt={isBoy ? "boy image" : "girl image"} className="child-image" />
            </div>
          </div>
        </div>

      </main>
      <div className='user-journey'>
      <div className='next-wrapper'>
        <div className='next-title'>What is next?</div>
        <div className='next-text'>
          <p>After quickly assessing your child's BMI through our intuitive interface, why not take the next step in managing their nutrition? Our feature for creating and customizing weekly meal plans is just what you need. Simply enter their daily calorie needs to get a customized weekly meal plan. It's simple to adjust for dietary requirements, ensuring they enjoy a balanced diet all week.</p>
        </div>
      </div>
      <div className='feature-wrapper'>
        <div className='feature-title'>MealPlans</div>
        <div className='feature-button'>
        <button className="try-it-btn" onClick={() => {
                  onNavigate('recipe');
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 0); }}>Find Recipes</button>
        </div>
      </div>
    </div>
    </div>
  );
}
