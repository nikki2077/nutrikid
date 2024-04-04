import './App.css'; 
import React, { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Footer from './Footer';
import BMI from './BMI'
import About from './About'
import Knowledge from './Knowledge'

function App() {
  const [view, setView] = useState('home'); 

  const renderComponent = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard />;
      case 'bmi':
        return <BMI />;
      case 'about':
        return <About />;
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
        <div className='app-logo' onClick={() => setView('home')}>NutriYoungs Compass</div>
        <div>
        <button onClick={() => setView('dashboard')} className="button">Dashboard</button>
          <button onClick={() => setView('knowledge')} className="button">Nutrition knowledge</button>
          <button onClick={() => setView('bmi')} className="button">BMI Calculator</button>
          <button onClick={() => setView('about')} className="button">About</button>
  
        </div>
        
      </div>

      {renderComponent()}
      
      <Footer /> 
    </div>
  );
}

export default App;
