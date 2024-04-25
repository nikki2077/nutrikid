import './CaloriesConverter.css';
import React, { useState } from 'react';

export default function CaloriesConverter() {
    const [ageGroup, setAgeGroup] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [weight, setWeight] = useState(18);
    const [gender, setGender] = useState(''); 

    const handleAgeGroupChange = (e) => setAgeGroup(e.target.value);
    const handleActivityLevelChange = (e) => setActivityLevel(e.target.value);
    const handleWeightChange = (e) => setWeight(e.target.value);
    const handleGenderChange = (e) => setGender(e.target.value);

    const calculateCalories = () => {
        let BMR = 0;
        if (gender === 'boy') {
            switch (ageGroup) {
                case '3-10':
                    BMR = 22.706 * weight + 504.3;
                    break;
                case '10-18':
                    BMR = 17.686 * weight + 658.2;
                    break;
                default:
                    BMR = 59.512 * weight - 30.4; // Default to 0-3 years if not specified
            }
        } else if (gender === 'girl') {
            switch (ageGroup) {
                case '3-10':
                    BMR = 20.315 * weight + 485.9;
                    break;
                case '10-18':
                    BMR = 13.384 * weight + 692.6;
                    break;
                default:
                    BMR = 58.317 * weight - 31.1; // Default to 0-3 years if not specified
            }
        }

        let factor = 1.2; // Default sedentary
        switch (activityLevel) {
            case 'lightly_active':
                factor = 1.4;
                break;
            case 'moderately_active':
                factor = 1.6;
                break;
            case 'very_active':
                factor = 1.8;
                break;
        }

        let additionalCalories = (ageGroup === '3-10' || ageGroup === '10-18') ? 150 : 100; // Growth needs
        let totalCalories = (BMR * factor) + additionalCalories;

        return Math.round(totalCalories);
    };

    return (
        <div className="converter">
            <div>
                I am a  
                <span> </span>
                <select value={gender} onChange={handleGenderChange} className="custom-select">
                    <option value="">Select gender</option>
                    <option value="boy">Boy</option>
                    <option value="girl">Girl</option>
                </select>, <span> </span>
                <select value={ageGroup} onChange={handleAgeGroupChange} className="custom-select">
                    <option value="">Select age group</option>
                    <option value="3-10">3-10 years old</option>
                    <option value="10-18">10-18 years old</option>
                </select> <span> </span>
                years old, my weight is 
                <input 
                    type="number"
                    value={weight}
                    onChange={handleWeightChange}
                    min="0"
                    max="500"
                    step="1"
                /> kg, and my activity level is <span> </span>
                <select value={activityLevel} onChange={handleActivityLevelChange} className='custom-select'>
                    <option value="">Select activity level</option>
                    <option value="sedentary">Sedentary (minimal activity)</option>
                    <option value="lightly_active">Lightly active (light exercise or sports 1-3 days/week)</option>
                    <option value="moderately_active">Moderately active (moderate exercise or sports 3-5 days/week)</option>
                    <option value="very_active">Very active (hard exercise every day, or exercising 2x/day)</option>
                </select>.
            </div>
            <div>
                Estimated Daily Caloric Need: <span className="highlight-output">{calculateCalories()} Calories</span>
            </div>
        </div>
    );
}
