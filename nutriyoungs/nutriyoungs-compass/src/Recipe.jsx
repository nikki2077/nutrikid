import React, { useState } from 'react';
import CaloriesConverter from './CaloriesConverter';
import DietOption from './DietOption';
import DisplayRecipe from './DisplayRecipe';
import './Recipe.css';

export default function Recipe() {
    const [showConverter, setShowConverter] = useState(false);
    const [recipe, setRecipe] = useState(null);

    const toggleConverterVisibility = () => setShowConverter(prev => !prev);

    const handlePreferencesSubmit = async (preferences) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        let url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;

        if (preferences.cuisine && preferences.cuisine !== 'All') {
            url += `&cuisine=${preferences.cuisine}`;
        }
        if (preferences.dietHabit && preferences.dietHabit !== 'No Diet Habit') {
            url += `&diet=${preferences.dietHabit}`;
        }
        if (preferences.calorieNeeds) {
            url += `&maxCalories=${preferences.calorieNeeds}`;
        }

        console.log("Fetching URL: ", url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.recipes && data.recipes.length > 0) {
                console.log(data.recipes[0]);
                setRecipe(data.recipes[0]);
            } else {
                console.log("No recipes found.");
                setRecipe(null);
            }
        } catch (error) {
            console.error('Error fetching the recipe:', error);
        }
    };

    return (
        <div className='recipe'>
            <div className='page-container'>
                <div className='recipe-options'>
                <h1>Recipe Recommendation</h1>
                {showConverter && <CaloriesConverter />}
                <DietOption onToggleVisibility={toggleConverterVisibility} onSubmitPreferences={handlePreferencesSubmit} />
                </div>
                <div className='recipe-content'>
                {recipe && <DisplayRecipe recipe={recipe} />}
                </div>
            </div>
        </div>
    );
}
