import './App.css'; 
import React, { useState } from 'react';
import Landing from './Landing';
import Footer from './Footer';
import BMI from './BMI';
import Knowledge from './Knowledge';
import ComingSoon from './ComingSoon';
import Upload from './Upload';
import Recipe from './Recipe'


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
      case 'upload':
        return <Upload />
      case 'recipe':
        return <Recipe />
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
          <button
            onClick={() => setView('upload')}
            className="button"
            style={view === 'upload' ? activeButtonStyle : {}}
          >
            Upload
          </button>
          <button
            onClick={() => setView('recipe')}
            className="button"
            style={view === 'recipe' ? activeButtonStyle : {}}
          >
            Recipe
          </button>
        </div>
        
      </div>

      {renderComponent()}
      
      <Footer onNavigate={handleFooterNavigation} /> 
    </div>
  );
}

export default App;
