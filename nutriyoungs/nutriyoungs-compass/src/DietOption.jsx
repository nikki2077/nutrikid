import React from 'react';
import './DietOption.css'; 

const DietOption = ({ onToggleVisibility }) => {
    return (
        <div className="diet-option">
            <p>Diet Option Component</p>
            <button onClick={onToggleVisibility}>I'm not sure about this</button>
        </div>
    );
};

export default DietOption;
