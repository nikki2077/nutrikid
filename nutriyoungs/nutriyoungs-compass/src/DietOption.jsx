// import React, { useState } from 'react';
// import './DietOption.css';


// const DietOption = ({ onToggleVisibility, onSubmitPreferences }) => {
//     const [calorieNeeds, setCalorieNeeds] = useState(2000);
//     const [selectedCuisine, setSelectedCuisine] = useState('');
//     const [selectedDietHabit, setSelectedDietHabit] = useState('');
//     const [mealCount, setMealCount] = useState(3);

//     const cuisines = ['italian', 'japanese', 'chinese', 'indian', 'american'];
//     const dietHabits = ['Gluten Free', 'vegetarian'];

//     const handleCalorieChange = (event) => {
//         setCalorieNeeds(event.target.value);
//     };

//     const handleCuisineSelection = (cuisine) => {
//         setSelectedCuisine(cuisine === selectedCuisine ? '' : cuisine);
//     };

//     const handleDietHabitSelection = (habit) => {
//         setSelectedDietHabit(habit === selectedDietHabit ? '' : habit);
//     };

//     const handleSubmit = () => {
//         const preferences = {
//             calorieNeeds,
//             cuisine: selectedCuisine || undefined,
//             dietHabit: selectedDietHabit || undefined,
//             mealCount,
//         };
//         onSubmitPreferences(preferences);
//     };

//     return (
//         <div className="diet-option">
//             <div className="calorie-slider-container">
//                 <h2>Level of Calorie Needs (per day)?</h2>
//                 <button onClick={onToggleVisibility} className="unsure-button">
//                     I'm not sure about this
//                 </button>
//                 <br />
//                 <br />
//                 <div className="calorie-slider-container">
//                     <label htmlFor="calorie-slider">Calories per day:</label> <br />
//                     <input
//                         type="range"
//                         id="calorie-slider"
//                         min="1000"  
//                         max="3000"
//                         value={calorieNeeds}
//                         onChange={handleCalorieChange}
//                         step="100"
//                     />
//                     <div className="calorie-values">
//                         <span>1000</span>
//                         <span>{calorieNeeds}</span>
//                         <span>3000</span>
//                     </div>
//                 </div>
//             </div>
//             <div className="selection-container">
//                 <div className="cuisine-selection">
//                     <h2>Any Cuisine Preference?</h2>
//                     {cuisines.map((cuisine) => (
//                         <button
//                             key={cuisine}
//                             name={cuisine}
//                             onClick={() => handleCuisineSelection(cuisine)}
//                             className={selectedCuisine === cuisine ? 'selected' : ''}
//                         >
//                             {cuisine}
//                         </button>
//                     ))}
//                 </div>
//                 <div className="diet-habit-selection">
//                     <h2>Any Diet Preference?</h2>
//                     {dietHabits.map((habit) => (
//                         <button
//                             key={habit}
//                             name={habit.replace(' ', '_')}
//                             onClick={() => handleDietHabitSelection(habit)}
//                             className={selectedDietHabit === habit ? 'selected' : ''}
//                         >
//                             {habit}
//                         </button>
                        
//                     ))}
                    
//                     <h2>Meals per day:</h2>
//                         <input 
//                         type="number" 
//                         value={mealCount} 
//                         onChange={e => setMealCount(e.target.value)} 
//                         min="1" 
//                         max="5" 
//                         className="meals-per-day-input" 
//                         />
//                 </div>

//                 <div className="button-container">
//                 <button onClick={handleSubmit} className="generate-button">
//                     Generate
//                 </button>
//             </div>
//             </div>


//         </div>
//     );
// };
import React, { useState } from 'react';
import './DietOption.css';
import CaloriesConverter from './CaloriesConverter';


const DietOption = ({ onSubmitPreferences, setCalorieNeeds }) => {
    const [calorieInput, setCalorieInput] = useState(500);
    const [showConverter, setShowConverter] = useState(false);

    const handleCalorieChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setCalorieInput(value);
        setCalorieNeeds(value);
    };

    const handleConverterUpdate = (caloriesPerMeal) => {
        setCalorieInput(caloriesPerMeal);
        setCalorieNeeds(caloriesPerMeal);
    };

    const handleSubmit = () => {
        onSubmitPreferences();
    };

    const toggleVisibility = () => {
        setShowConverter(!showConverter);
    };

    return (
        <div className="diet-option">
            <h4>How many calories per meal?</h4>
            <button onClick={toggleVisibility} className="unsure-button">
                {showConverter ? "Hide Calculator" : "I'm not sure about this"}
            </button>
            {showConverter && (
                <CaloriesConverter onCalorieUpdate={handleConverterUpdate} />
            )}
            <div className="calorie-slider-container">
                <label htmlFor="calorie-slider">Calories per meal: <span className="calorie-input">{calorieInput} </span>calories</label> <br />
                <input
                    type="range"
                    id="calorie-slider"
                    min="0"
                    max="1000"
                    value={calorieInput}
                    onChange={handleCalorieChange}
                    step="50"
                />
                <div className="calorie-values">
                    <span className="calorie-value-min">0</span>
                    <span className="calorie-value-mid1">250</span>
                    <span className="calorie-value-mid2">500</span>
                    <span className="calorie-value-mid3">750</span>
                    <span className="calorie-value-max">1000</span>
                </div>
            </div>
            <div className="button-container">
                <button onClick={handleSubmit} className="generate-button">
                    Generate
                </button>
            </div>
        </div>
    );
};

export default DietOption;
