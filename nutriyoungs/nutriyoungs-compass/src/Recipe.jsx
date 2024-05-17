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

        let url = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${apiKey}
        &number=1&minCalories=${calorieNeeds - 50}&maxCalories=${calorieNeeds + 50}&offset=${randomOffset}`;

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
                    <div className="bmi-title">MealPlans:
                        <h4>Tailored Recipes for Kids</h4>
                    </div>
                    <p className="bmi-intro">
                        Rapid creation and customization of weekly meal plans based on dietary needs and preferences to ensure a balanced and varied diet. Enter the desired calories per meal to get a tailored recipe recommendation. This feature provides options to adjust meals according to specific dietary requirements, easily manage and optimize nutrition, and support informed decision-making for maintaining balanced dietary habits.
                    </p>
                </div>
                <div className='recipe-content'>
                    <div className='left-column'>
                        {showConverter && <CaloriesConverter />}
                        <DietOption onToggleVisibility={toggleConverterVisibility} onSubmitPreferences={() => setFetchTrigger(fetchTrigger + 1)} setCalorieNeeds={setCalorieNeeds} showConverter={showConverter} />
                        {loading ? <p>Loading...</p> : recipe ? <DisplayRecipe recipe={recipe} /> : <p>No recipe to display.</p>}
                        <div className='note'>
                            <p>* In nutritional contexts, 'calories' and 'kcal' mean the same thing and represent the same amount of energy. There is no need to convert between them as 1 kcal equals 1 calorie. This common usage helps simplify tracking your energy intake from food. Note: Energy can also be measured in kilojoules (kJ), where 1 calorie equals 4.18 kJ.</p>
                            <p>* Calories and kcal are used interchangeably and refer to the same amount of energy, but kilojoules require conversion. Usage may differ depending on where you live.</p>
                        </div>
                    </div>
                    <div className='right-column'>
                        <div className='bmi-buttons'>
                            <button className="btn-secondary mb-2" onClick={() => {
                                onNavigate('landing');
                                setTimeout(() => {
                                    window.scrollTo(0, 0);
                                }, 0);
                            }}>Back to Home</button>
                            <button className="btn-primary" onClick={() => window.scrollTo(0, 0)}>To the Top</button>
                        </div>
                        <div className='user-journey'>
                            <div className='next-wrapper'>
                                <div className='next-title'>What is next?</div>
                                <div className='next-text'>
                                    <p>After creating your child's weekly meal plan, take it a step further with our next feature. Just upload a photo of any food item, and our system will quickly provide detailed nutritional information. This helps you make informed decisions about your child's diet, ensuring it meets their nutritional needs.</p>
                                </div>
                            </div>
                            <div className='feature-wrapper'>
                                <div className='feature-title'>NutriScan</div>
                                <div className='feature-button'>
                                    <button className="try-it-btn" onClick={() => {
                                        onNavigate('upload');
                                        setTimeout(() => {
                                            window.scrollTo(0, 0);
                                        }, 0);
                                    }}>Snap & Discover</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
