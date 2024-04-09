import './App.css'; 
import React, { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Footer from './Footer';
import BMI from './BMI';
import Knowledge from './Knowledge';
import ComingSoon from './ComingSoon';
import Logo from './assets/images/compass.png'

function App() {
  const [view, setView] = useState('home'); 

  const handleFooterNavigation = (viewName) => {
    setView(viewName);
  };

  const renderComponent = () => {
    switch (view) {
      case 'dashboard':
        return <ComingSoon/>;
      case 'bmi':
        return <BMI />;
      case 'knowledge':
        return <Knowledge />;
      case 'home':
      default:
        return <Landing onNavigate={setView} />; 
    }
  };

  return (
    <div className="main-section">
      <div className="NavigationBar">
        <div className='app-logo' onClick={() => setView('home')}>
          NutriYoungs Compass
          </div>
        <div>
        <button onClick={() => setView('dashboard')} className="button">Dashboard</button>
          <button onClick={() => setView('knowledge')} className="button">Nutrition knowledge</button>
          <button onClick={() => setView('bmi')} className="button">BMI Calculator</button>
        </div>
        
      </div>

      {renderComponent()}
      
      <Footer onNavigate={handleFooterNavigation} /> 
    </div>
  );
}

export default App;
