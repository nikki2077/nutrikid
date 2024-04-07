import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';

export default function BMI(){
    const [result, setResult] = useState(null);

    useEffect(() => {
      const handleMessage = (event) => {
        if (event.origin === "https://www.cdc.gov") {
          console.log("Data received:", event.data);
          setResult(event.data);
        }
      };
  
      window.addEventListener("message", handleMessage);
  
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }, []);
    return(
    <>
      <iframe
        src="https://www.cdc.gov/healthyweight/bmi/calculator-widget.html"
        title="BMI Calculator for Child and Teen"
        height="940"
        frameBorder="0"
        style={{ width: '600%' }}
      ></iframe>
    </>
    )
}

