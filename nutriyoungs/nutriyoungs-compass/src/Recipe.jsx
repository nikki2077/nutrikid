import React, { useState } from 'react';
import './Recipe.css';
import CaloriesConverter from './CaloriesConverter';
import DietOption from './DietOption';
import DisplayRecipe from './DisplayRecipe';

export default function Recipe() {
    const [showConverter, setShowConverter] = useState(false);

    const toggleConverterVisibility = () => {
        setShowConverter(prev => !prev);
    };

    return (
        <div className='recipe'>
            <CaloriesConverter isVisible={showConverter} />
            <DietOption onToggleVisibility={toggleConverterVisibility} />
            <DisplayRecipe />
        </div>
    );
}
