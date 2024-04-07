import React from 'react';
import Vege from './Vege';
import Fruit from './Fruit';
import FruitVege from './Fruit-Vege';
import FoodConsumption from './FoodConsumption';
import './Knowledge.css'

export default function Knowledge() {
  return (
    <div className='knowledge'>
      <Vege />
      <Fruit />
      <FruitVege/>
      <FoodConsumption/>
    </div>
  );
}
