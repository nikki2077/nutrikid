import React from 'react';
import Vege from './Vege';
import Fruit from './Fruit';
import FruitVege from './Fruit-Vege';
import FoodConsumption from './FoodConsumption';

export default function Knowledge() {
  return (
    <div>
      <Vege />
      <br />
      <Fruit />
      <br />
      <FruitVege/>
      <br />
      <FoodConsumption/>
    </div>
  );
}
