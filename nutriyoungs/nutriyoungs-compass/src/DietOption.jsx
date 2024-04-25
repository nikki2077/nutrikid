import React, { useState } from 'react';
import './DietOption.css';


const DietOption = ({ onToggleVisibility, onSubmitPreferences }) => {
    const [calorieNeeds, setCalorieNeeds] = useState(0);
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedDietHabit, setSelectedDietHabit] = useState('');

    const cuisines = ['italian', 'japanese', 'chinese', 'indian', 'american'];
    const dietHabits = ['Gluten Free', 'vegetarian'];

    const handleCalorieChange = (event) => {
        setCalorieNeeds(event.target.value);
    };

    const handleCuisineSelection = (cuisine) => {
        setSelectedCuisine(cuisine === selectedCuisine ? '' : cuisine);
    };

    const handleDietHabitSelection = (habit) => {
        setSelectedDietHabit(habit === selectedDietHabit ? '' : habit);
    };

    const handleSubmit = () => {
        const preferences = {
            calorieNeeds,
            cuisine: selectedCuisine || undefined,
            dietHabit: selectedDietHabit || undefined,
        };
        onSubmitPreferences(preferences);
    };

    return (
        <div className="diet-option">
            <div className="calorie-slider-container">
                <h2>Level of Calorie Needs (per day)?</h2>
                <button onClick={onToggleVisibility} className="unsure-button">
                    I'm not sure about this
                </button>
                <br />
                <br />
                <div className="calorie-slider-container">
                    <label htmlFor="calorie-slider">Calories per day:</label> <br />
                    <input
                        type="range"
                        id="calorie-slider"
                        min="0"  
                        max="3000"
                        value={calorieNeeds}
                        onChange={handleCalorieChange}
                        step="100"
                    />
                    <div className="calorie-values">
                        <span>0</span>
                        <span>{calorieNeeds}</span>
                        <span>3000</span>
                    </div>
                </div>
            </div>
            <div className="selection-container">
                <div className="cuisine-selection">
                    <h2>Any Cusine Preference?</h2>
                    {cuisines.map((cuisine) => (
                        <button
                            key={cuisine}
                            name={cuisine}
                            onClick={() => handleCuisineSelection(cuisine)}
                            className={selectedCuisine === cuisine ? 'selected' : ''}
                        >
                            {cuisine}
                        </button>
                    ))}
                </div>
                <div className="diet-habit-selection">
                    <h2>Any Diet Preference?</h2>
                    {dietHabits.map((habit) => (
                        <button
                            key={habit}
                            name={habit.replace(' ', '_')}
                            onClick={() => handleDietHabitSelection(habit)}
                            className={selectedDietHabit === habit ? 'selected' : ''}
                        >
                            {habit}
                        </button>
                    ))}
                </div>
                <div className="button-container">
                <button onClick={handleSubmit} className="generate-button">
                    Generate
                </button>
            </div>
            </div>


        </div>
    );
};

export default DietOption;
