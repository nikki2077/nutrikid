import React from 'react';
import './Landing.css'; 

export default function Landing({onNavigate}) {
    return (
        <div className="landing">
            <div className="hero-section">
                <h1 className="title">NutriYoungs Compass</h1>
                <p className="subtitle">
                    Hi! My name is Dmitrii Rogoza and I'm an expert in web design and branding. I can help you make your website more attractive.
                </p>
                <button className="cta-button" onClick={() => onNavigate('bmi')}>
                    Starting with a BMI Test
                </button>
            </div>
        </div>
    );
}
