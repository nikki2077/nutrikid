import React, { useState } from 'react';
import './Landing.css'; 
import ReactCardFlip from 'react-card-flip';
import carbsImage from './assets/images/protein.jpeg'

const initialCardInfo = [
  {
    image: carbsImage,
    category: 'Macro Nutrients',
    cardName: 'Carbohydrates',
    information: 'Good sources of carbohydrates include fruits, vegetables, whole grains like oats and brown rice, and starchy foods like potatoes and whole grain bread.',
    isFlipped: false
  },
  {
    image: carbsImage,
    category: 'Macro Nutrients',
    cardName: 'Proteins',
    information: 'Good sources of protein include meat, poultry, fish, eggs, dairy products like milk and cheese, beans, and nuts.',
    isFlipped: false
  },
  {
    image: carbsImage,
    category: 'Macro Nutrients',
    cardName: 'Fats',
    information: 'Good sources of healthy fats include avocados, nuts, seeds, olive oil, and fatty fish like salmon.',
    isFlipped: false
  }
];

export default function Landing({ onNavigate }) {
    const [cards, setCards] = useState(initialCardInfo);

    function flipCard(index){
        const newCards = [...cards];
        newCards[index].isFlipped = !newCards[index].isFlipped;
        setCards(newCards);
    }

    return (
        <div className="landing">
            <div className="hero-section">
                <h1 className="title">Want to whip up healthy feeds that your little nippers will actually eat? <br />We’ve got you sorted with brilliant ideas!</h1>
                <br />
                <button className="cta-button" onClick={() => onNavigate('bmi')}>
                    Starting with a BMI Test
                </button>
            </div>

            {/* <div className='cards-container'>
            {cards.map((card, index) => (
              <div className='Info-wrapper' key={index}>
                  <ReactCardFlip flipDirection='horizontal' isFlipped={card.isFlipped}>
                      <div className='card card-front' onClick={() => flipCard(index)}>
                          <img src={card.image} alt={card.cardName} className="card-image" />
                          <div className="card-content">
                            <span className="card-category">{card.category}</span>
                            <h2 className="card-name">{card.cardName}</h2>
                          </div>
                      </div>

                      <div className='card card-back' onClick={() => flipCard(index)}>
                          <div className="card-content">
                            <h2 className="card-name">{card.cardName}</h2>
                            <p className="card-information">{card.information}</p>
                          </div>
                      </div>
                  </ReactCardFlip>
              </div>
            ))}
            </div> */}

        </div>
    );
}
