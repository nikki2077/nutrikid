import React, { useState } from 'react';
import './DietOption.css';

const DietOption = ({ onToggleVisibility, onSubmitPreferences }) => {
    const [calorieNeeds, setCalorieNeeds] = useState(2500);
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedDietHabit, setSelectedDietHabit] = useState('');

    const cuisines = ['Italian', 'Japanese', 'Chinese', 'Indian', 'American'];
    const dietHabits = ['Dairy Free', 'Gluten Free', 'Vegetarian'];

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
            <p>Diet Option Component</p>
            <button onClick={onToggleVisibility} className="unsure-button">
                I'm not sure about this
            </button>
            <div className="calorie-slider-container">
                <label htmlFor="calorie-slider">Calories per day:</label>
                <input
                    type="range"
                    id="calorie-slider"
                    min="1500"
                    max="3000"
                    value={calorieNeeds}
                    onChange={handleCalorieChange}
                    step="100" 
                />
                <div className="calorie-values">
                    <span>1500</span>
                    <span>{calorieNeeds}</span> 
                    <span>3000</span>
                </div>
            </div>
            <div className="selection-container">
                <div className="cuisine-selection">
                    <p>Cuisine Preference:</p>
                    {cuisines.map((cuisine) => (
                        <button
                            key={cuisine}
                            onClick={() => handleCuisineSelection(cuisine)}
                            className={selectedCuisine === cuisine ? 'selected' : ''}
                        >
                            {cuisine}
                        </button>
                    ))}
                </div>
                <div className="diet-habit-selection">
                    <p>Diet Habit:</p>
                    {dietHabits.map((habit) => (
                        <button
                            key={habit}
                            onClick={() => handleDietHabitSelection(habit)}
                            className={selectedDietHabit === habit ? 'selected' : ''}
                        >
                            {habit}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={handleSubmit} className="generate-button">
                Generate
            </button>
        </div>
    );
};

export default DietOption;
