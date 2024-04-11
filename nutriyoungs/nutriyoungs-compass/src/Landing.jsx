import React from 'react';
import './Landing.css'; 

export default function Landing({onNavigate}) {
    return (
        <div className="landing">
            <div className="hero-section">
                <h1 className="title">Want to whip up healthy feeds that your little nippers will actually eat? <br />We’ve got you sorted with brilliant ideas!</h1>
                <br />
                <button className="cta-button" onClick={() => onNavigate('bmi')}>
                    Starting with a BMI Test
                </button>
            </div>
        </div>
    );
}
