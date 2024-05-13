import './App.css';
import React, { useState } from 'react';
import Landing from './Landing';
import Footer from './Footer';
import BMI from './BMI';
import Knowledge from './Knowledge';
import Upload from './Upload';
import Recipe from './Recipe';
import Recipt from './recipt'
import logoImage from './assets/images/logo.png';

function App() {
  const [view, setView] = useState('home');

  const handleFooterNavigation = (viewName) => {
    setView(viewName);
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
    color: '#3498DB',
  };

  return (
    <div className="main-section">
      <div className="NavigationBar">
        <div className='app-logo' onClick={() => setView('home')}>
          <img src={logoImage} alt="logo-image" className='logo-image' />
          NutriYoungs Compass
        </div>
        <div>
          <button
              onClick={() => setView('knowledge')}
              className="button"
              style={view === 'knowledge' ? activeButtonStyle : {}}
            >
              Trends
          </button>
          <button
              onClick={() => setView('bmi')}
              className="button"
              style={view === 'bmi' ? activeButtonStyle : {}}
            >
              BMI
          </button>
          <button
              onClick={() =>setView('upload')}
              className="button"
              style={view === 'upload' ? activeButtonStyle : {}}
            >
              Recognize
          </button>
          <button
              onClick={() => setView('recipe')}
              className="button"
              style={view === 'recipe' ? activeButtonStyle : {}}
            >
              Recipe
          </button>
          <button
              onClick={() => setView('recipt')}
              className="button"
              style={view === 'recipt' ? activeButtonStyle : {}}
            >
              Recipt Scanner
          </button>
        </div>
      </div>

      {renderComponent()}

      <Footer onNavigate={handleFooterNavigation} />
    </div>
  );
}

export default App;
