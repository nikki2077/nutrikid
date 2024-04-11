import './App.css'; 
import React, { useState } from 'react';
import Landing from './Landing';
import Footer from './Footer';
import BMI from './BMI';
import Knowledge from './Knowledge';
import ComingSoon from './ComingSoon';


function App() {
  const [view, setView] = useState('home'); 

  const handleFooterNavigation = (viewName) => {
    setView(viewName);
  };

  const renderComponent = () => {
    switch (view) {
      case 'bmi':
        return <BMI />;
      case 'knowledge':
        return <Knowledge />;
      case 'home':
      default:
        return <Landing onNavigate={setView} />; 
    }
  };

  const activeButtonStyle = {
    backgroundColor: '#4CAF50', 
    color: 'white',
  };

  return (
    <div className="main-section">
      <div className="NavigationBar">
        <div className='app-logo' onClick={() => setView('home')}>
          NutriYoungs Compass
          </div>
        <div>
        <button
            onClick={() => setView('bmi')}
            className="button"
            style={view === 'bmi' ? activeButtonStyle : {}}
          >
            BMI Calculator
          </button>
          <button
            onClick={() => setView('knowledge')}
            className="button"
            style={view === 'knowledge' ? activeButtonStyle : {}}
          >
            Nutrition knowledge
          </button>
        </div>
        
      </div>

      {renderComponent()}
      
      <Footer onNavigate={handleFooterNavigation} /> 
    </div>
  );
}

export default App;
