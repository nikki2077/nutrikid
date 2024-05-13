import './App.css';
import React, { useState } from 'react';
import Landing from './Landing';
import Footer from './Footer';
import BMI from './BMI';
import Knowledge from './Knowledge';
import Upload from './Upload';
import Recipe from './Recipe';
import Recipt from './recipt';
import logoImage from './assets/images/logo.png';
import menuIcon from './assets/images/hide-icon.png'; 

function App() {
  const [view, setView] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleFooterNavigation = (viewName) => {
    setView(viewName);
    setIsNavOpen(false); 
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const renderComponent = () => {
    switch (view) {
      case 'bmi':
        return <BMI onNavigate={setView} />;
      case 'knowledge':
        return <Knowledge onNavigate={setView} />; 
      case 'upload':
        return <Upload onNavigate={setView} />; 
      case 'recipe':
        return <Recipe onNavigate={setView} />; 
      case 'recipt':
        return <Recipt onNavigate={setView} />;
      case 'home':
      default:
        return <Landing onNavigate={setView} />;
    }
  };

  const activeButtonStyle = {
    color: '#4CAF50',
  };

  return (
    <div className="main-section">
      <div className="NavigationBar">
        <div className="app-logo" onClick={() => setView('home')}>
          <img src={logoImage} alt="logo-image" className="logo-image" />
          NutriYoungs Compass
        </div>
        <img src={menuIcon} alt="menu-icon" className="menu-icon" onClick={toggleNav} />
        <div className={`nav-buttons ${isNavOpen ? 'open' : ''}`}>
          <button
            onClick={() => setView('knowledge')}
            className="button"
            style={view === 'knowledge' ? activeButtonStyle : {}}
          >
            NutriTrends
          </button>
          <button
            onClick={() => setView('bmi')}
            className="button"
            style={view === 'bmi' ? activeButtonStyle : {}}
          >
            BMI Check
          </button>
          <button
            onClick={() => setView('upload')}
            className="button"
            style={view === 'upload' ? activeButtonStyle : {}}
          >
            MealPlans
          </button>
          <button
            onClick={() => setView('recipe')}
            className="button"
            style={view === 'recipe' ? activeButtonStyle : {}}
          >
            NutriScan
          </button>
          <button
            onClick={() => setView('recipt')}
            className="button"
            style={view === 'recipt' ? activeButtonStyle : {}}
          >
            SpendSmart
          </button>
        </div>
      </div>

      {renderComponent()}

      <Footer onNavigate={handleFooterNavigation} />
    </div>
  );
}

export default App;
