import React, { useState } from 'react';
import CaloriesConverter from './CaloriesConverter';
import DietOption from './DietOption';
import DisplayRecipe from './DisplayRecipe';
import './Recipe.css';
import './App.css';

export default function Recipe({ onNavigate }) {
    const [showConverter, setShowConverter] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);

    const toggleConverterVisibility = () => setShowConverter(prev => !prev);

    const handlePreferencesSubmit = async (preferences) => {
        console.log("Preferences received:", preferences);
        const apiKey = import.meta.env.VITE_API_KEY;
        const mealsPerDay = parseInt(preferences.mealCount, 10);
        const caloriesPerMeal = Math.floor(preferences.calorieNeeds / mealsPerDay);

        let tags = preferences.cuisine && preferences.cuisine !== 'All' ? preferences.cuisine.toLowerCase() : '';
        let excludeTags = preferences.dietHabit && preferences.dietHabit.toLowerCase().includes('free')
            ? preferences.dietHabit.toLowerCase().split(' ')[0]
            : '';

        let url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=${tags}&minCalories=0&maxCalories=${caloriesPerMeal}${excludeTags ? `&excludeTags=${excludeTags}` : ''}`;

        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setLoading(false);
            if (data.recipes && data.recipes.length > 0) {
                setRecipe(data.recipes[0]);
            } else {
                setRecipe(null);
                alert("No recipes found for the specified criteria.");
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching the recipe:', error);
            alert("Failed to fetch recipes. Please try again.");
        }
    };

    return (
        <div className='recipe'>
            <div className='page-container'>
                <div className="intro-section">
                    <h1 className="bmi-title">Recipe Recommendation</h1>
                    <p className="bmi-intro">
                        Rapid creation and customization of weekly meal plans based on a child's dietary needs and preferences to ensure a balanced and varied diet throughout the week. Enter the daily calorie intake to get a tailored weekly meal plan. Provides options to adjust meals according to specific dietary requirements, easily manage and optimize their children's nutrition. Supports informed decision-making for maintaining balanced dietary habits.
                    </p>
                </div>
                <div className='recipe-options'>
                    {showConverter && <CaloriesConverter />}
                    <DietOption onToggleVisibility={toggleConverterVisibility} onSubmitPreferences={handlePreferencesSubmit} />
                </div>
                <div className='recipe-content'>
                    {loading ? <p>Loading...</p> : recipe ? <DisplayRecipe recipe={recipe} /> : <p>No recipe to display.</p>}
                </div>
            </div>
            <div className="bmi-buttons">
                <button className="btn-secondary mb-2" onClick={() => {
                    onNavigate('landing');
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                    }, 0);  
                }}>Back to Home</button>
                <button className="btn-primary" onClick={() => window.scrollTo(0, 0)}>To the Top</button>
            </div>
        </div>
    );
}
