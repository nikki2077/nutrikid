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
        console.log("Preferences received:", preferences);
    
        const apiKey = import.meta.env.VITE_API_KEY;
        let url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;
    
        if (preferences.cuisine !== 'All' || preferences.dietHabit !== 'No Diet Habit') {
            url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&include-tags=`;
    
            if (preferences.cuisine !== 'All' && preferences.dietHabit === 'No Diet Habit') {
                url += `${preferences.cuisine}`;
            } else if (preferences.cuisine === 'All' && preferences.dietHabit !== 'No Diet Habit') {
                if (preferences.dietHabit === 'vegetarian') {
                    url += `${preferences.cuisine},${preferences.dietHabit.toLowerCase()}`;
                } else if (preferences.dietHabit === 'Dairy Free'){
                    url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&exclude-tags=`;
                    url += `dairy`;
                } else {
                    url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&exclude-tags=`;
                    url += `gluten`;
                }
            } else {
                if (preferences.dietHabit === 'vegetarian') {
                    url += `${preferences.cuisine},${preferences.dietHabit.toLowerCase()}`;
                } else {
                    url += `${preferences.cuisine}&exclude-tags=${preferences.dietHabit.split(' ')[0].toLowerCase()}`;
                    console.log(url);
                }
            }
        } else {
            url += `&exclude-tags=${preferences.dietHabit.toLowerCase()}`;
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
