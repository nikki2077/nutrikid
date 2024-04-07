import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import data from './assets/data/overweight.json';

const Overweight = () => {
    const [barHeights, setBarHeights] = useState(data.map(() => 0));
    const [animationStatus, setAnimationStatus] = useState('stopped'); 
    const [intervals, setIntervals] = useState([]);
  
    useEffect(() => {
      const allFinished = barHeights.every((height, index) => height >= data[index]['Overweight or obese']);
      if (allFinished && animationStatus === 'playing') {
        setAnimationStatus('finished');
        intervals.forEach(clearInterval); 
      }
    }, [barHeights, animationStatus, data, intervals]);
  
    const startAnimation = () => {
      if (animationStatus === 'finished') {
        setBarHeights(data.map(() => 0));
      }
      setAnimationStatus('playing');
      const newIntervals = data.map((item, index) => setInterval(() => {
        setBarHeights(currentHeights => {
          const newHeights = [...currentHeights];
          if (newHeights[index] < item['Overweight or obese']) {
            newHeights[index] += 1; 
          } else {
            clearInterval(newIntervals[index]); 
          }
          return newHeights;
        });
      }, 50)); 
      setIntervals(newIntervals);
    };
  
    const pauseAnimation = () => {
      intervals.forEach(clearInterval);
      setAnimationStatus('paused');
    };
  
    const togglePlayPause = () => {
      if (animationStatus === 'playing') {
        pauseAnimation();
      } else {
        startAnimation();
      }
    };
  
    useEffect(() => {
      return () => intervals.forEach(clearInterval);
    }, [intervals]);
  
    const traces = [
      {
        x: data.map(item => item['Age group']),
        y: barHeights,
        type: 'bar',
        marker: { color: 'rgb(55, 83, 109)' },
      }
    ];
  
    const layout = {
      title: 'Percentage of Overweight or Obese by Age Group',
      xaxis: { title: 'Age Group' },
      yaxis: { title: 'Percentage Overweight or Obese', range: [0, Math.max(...data.map(item => item['Overweight or obese'])) + 5] },
      autosize: true
    };
  
    const buttonText = animationStatus === 'playing' ? 'Pause' : animationStatus === 'finished' ? 'Play Again' : 'Play';
  
    return (
      <>
        <button onClick={togglePlayPause}>{buttonText}</button>
        <Plot data={traces} layout={layout} />
      </>
    );
  };
  
export default Overweight;
