import React, { useState, useEffect } from 'react';
import './DisplayRecipe.css';

const DisplayRecipe = ({ recipe }) => {
  const [nutritionImageUrl, setNutritionImageUrl] = useState('');

  useEffect(() => {
    if (recipe && recipe.id) {
      const apiKey = import.meta.env.VITE_API_KEY; 
      const url = `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.png?apiKey=${apiKey}`;

      setNutritionImageUrl(url);
    }
  }, [recipe]);

  if (!recipe) {
    return <div>Loading recipe data...</div>;
  }

  const ingredientsList = recipe.extendedIngredients.map((ingredient, index) => (
    <li key={index}>{ingredient.original}</li>
  ));

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <h2>Ingredients</h2>
      <ul>{ingredientsList}</ul>
      <h2>Instructions</h2>
      <div className='ins' dangerouslySetInnerHTML={{ __html: recipe.instructions || "No instructions provided." }} />
      <h2>Cooking Time</h2>
      <p>Ready in {recipe.readyInMinutes || "Time not available"} minutes</p>
      <h2>Nutrition Information</h2>
      {nutritionImageUrl ? (
        <img src={nutritionImageUrl} alt="Nutrition Information" className="nutrition-image" />
      ) : (
        <p>Loading nutrition information...</p>
      )}
    </div>
  );
};

export default DisplayRecipe;
