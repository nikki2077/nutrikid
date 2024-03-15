import React, { useState } from 'react';
import Tracker from './Tracker'; 
import SunscreenCalculator from './SunscreenCalculator';
import Graph from './Graph';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  const [view, setView] = useState('home');

  const renderComponent = () => {
    switch (view) {
      case 'tracker':
        return <Tracker />;
      case 'sunscreenCalculator':
        return <SunscreenCalculator />;
      case 'graph':
        return <Graph />;
      default:
        return <LandingPage onTryClick={() => setView('tracker')}/>
    }
  };

  return (
    <div>
      <div className="NavigationBar">
      <div className='app-logo' onClick={() => setView('home')}>G'day UV</div>
        <button onClick={() => setView('tracker')} className="Button Tracker">Tracker</button>
        <button onClick={() => setView('sunscreenCalculator')} className="Button SunscreenCalculator">Sunscreen Calculator</button>
        <button onClick={() => setView('graph')} className="Button Graph">Trend</button>
      </div>
      {renderComponent()}
    </div>
  );
}

export default App;
