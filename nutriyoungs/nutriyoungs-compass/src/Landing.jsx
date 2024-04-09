import React from 'react';
import './Landing.css'; 

export default function Landing({onNavigate}) {
    return (
        <div className="landing">
            <div className="hero-section">

                <h1 className="title">NutriYoungs Compass</h1>
                <button className="cta-button" onClick={() => onNavigate('bmi')}>
                    Starting with a BMI Test
                </button>
            </div>
        </div>
    );
}
