import React, { useState, useEffect } from 'react';
import CaloriesConverter from './CaloriesConverter';
import DietOption from './DietOption';
import DisplayRecipe from './DisplayRecipe';
import './Recipe.css';
import './App.css';



// export default function Recipe({ onNavigate }) {
//     const [showConverter, setShowConverter] = useState(false);
//     const [recipe, setRecipe] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const toggleConverterVisibility = () => setShowConverter(prev => !prev);

//     const handlePreferencesSubmit = async (preferences) => {
//         console.log("Preferences received:", preferences);
//         const apiKey = import.meta.env.VITE_API_KEY;
//         const mealsPerDay = parseInt(preferences.mealCount, 10);
//         const caloriesPerMeal = Math.floor(preferences.calorieNeeds / mealsPerDay);

//         let tags = preferences.cuisine && preferences.cuisine !== 'All' ? preferences.cuisine.toLowerCase() : '';
//         let excludeTags = preferences.dietHabit && preferences.dietHabit.toLowerCase().includes('free')
//             ? preferences.dietHabit.toLowerCase().split(' ')[0]
//             : '';

//         let url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=${tags}&minCalories=0&maxCalories=${caloriesPerMeal}${excludeTags ? `&excludeTags=${excludeTags}` : ''}`;

//         setLoading(true);
//         try {
//             const response = await fetch(url);
//             const data = await response.json();
//             setLoading(false);
//             if (data.recipes && data.recipes.length > 0) {
//                 setRecipe(data.recipes[0]);
//             } else {
//                 setRecipe(null);
//                 alert("No recipes found for the specified criteria.");
//             }
//         } catch (error) {
//             setLoading(false);
//             console.error('Error fetching the recipe:', error);
//             alert("Failed to fetch recipes. Please try again.");
//         }
//     };

//     return (
//         <div className='recipe'>
//             <div className='page-container'>
//                 <div className="intro-section">
//                     <h1 className="bmi-title">Recipe Recommendation</h1>
//                     <p className="bmi-intro">
//                         Rapid creation and customization of weekly meal plans based on a child's dietary needs and preferences to ensure a balanced and varied diet throughout the week. Enter the daily calorie intake to get a tailored weekly meal plan. Provides options to adjust meals according to specific dietary requirements, easily manage and optimize their children's nutrition. Supports informed decision-making for maintaining balanced dietary habits.
//                     </p>
//                 </div>
//                 <div className='recipe-options'>
//                     {showConverter && <CaloriesConverter />}
//                     <DietOption onToggleVisibility={toggleConverterVisibility} onSubmitPreferences={handlePreferencesSubmit} />
//                 </div>
//                 <div className='recipe-content'>
//                     {loading ? <p>Loading...</p> : recipe ? <DisplayRecipe recipe={recipe} /> : <p>No recipe to display.</p>}
//                 </div>
//             </div>
//             <div className="bmi-buttons">
//                 <button className="btn-secondary mb-2" onClick={() => {
//                     onNavigate('landing');
//                     setTimeout(() => {
//                         window.scrollTo(0, 0);
//                     }, 0);  
//                 }}>Back to Home</button>
//                 <button className="btn-primary" onClick={() => window.scrollTo(0, 0)}>To the Top</button>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import CaloriesConverter from './CaloriesConverter';
// import DietOption from './DietOption';
// import DisplayRecipe from './DisplayRecipe';
// import './Recipe.css';
// import './App.css';

// import React, { useState, useEffect } from 'react';
// import CaloriesConverter from './CaloriesConverter';
// import DietOption from './DietOption';
// import DisplayRecipe from './DisplayRecipe';
// import './Recipe.css';
// import './App.css';

export default function Recipe({ onNavigate }) {
    const [showConverter, setShowConverter] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [calorieNeeds, setCalorieNeeds] = useState(500);  // Default calorie needs
    const [fetchTrigger, setFetchTrigger] = useState(0);

    const toggleConverterVisibility = () => setShowConverter(prev => !prev);

    const handlePreferencesSubmit = async () => {
        console.log("Preferences received:", calorieNeeds);
        const apiKey = import.meta.env.VITE_API_KEY;

        // Generate a random offset
        const randomOffset = Math.floor(Math.random() * 100);

        let url = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${apiKey}&number=1&minCalories=${calorieNeeds - 50}&maxCalories=${calorieNeeds + 50}&offset=${randomOffset}`;

        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setLoading(false);
            if (data && data.length > 0) {
                const recipeData = data[0];
                const recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeData.id}/information?apiKey=${apiKey}`;
                const recipeResponse = await fetch(recipeDetailsUrl);
                const recipeDetails = await recipeResponse.json();
                setRecipe(recipeDetails);
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

    useEffect(() => {
        if (fetchTrigger > 0) {
            handlePreferencesSubmit();
        }
    }, [fetchTrigger]);

    return (
        <div className='recipe'>
            <div className='page-container'>
                <div className="intro-section">
                    <h1 className="bmi-title">MealPlans:
<br />Tailored Recipes for Kids</h1>
                    <p className="bmi-intro">
                        Rapid creation and customization of weekly meal plans based on dietary needs and preferences to ensure a balanced and varied diet. Enter the desired calories per meal to get a tailored recipe recommendation. This feature provides options to adjust meals according to specific dietary requirements, easily manage and optimize nutrition, and support informed decision-making for maintaining balanced dietary habits.
                    </p>
                </div>
                <div className='recipe-options'>
                    <DietOption onToggleVisibility={toggleConverterVisibility} onSubmitPreferences={() => setFetchTrigger(fetchTrigger + 1)} setCalorieNeeds={setCalorieNeeds} showConverter={showConverter} />
                </div>
                <div className='recipe-content'>
                    {loading ? <p>Loading...</p> : recipe ? <DisplayRecipe recipe={recipe} /> : <p>No recipe to display.</p>}
                    <div>
                <p>* Calories and kcal are used interchangeably and refer to the same amount of energy, but kilojoules require conversion. Usage may differ depending on where you live.</p>
            </div>
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

