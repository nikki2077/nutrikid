import React from 'react';
import './LandingPage.css'

export default function LandingPage({ onTryClick }){
    return(
        <div className='landing-wrapper'>
            <div className='text-content'>
                <h1> G'day UV: Your Ultimate Guide to Sun Protection</h1>
                <h3>Discover G'day UV, our innovative platform designed to safeguard your family against the fierce sun. Our interactive site provides tailored advice, empowering you to enjoy the great outdoors worry-free. With G'day UV, you'll learn the ins and outs of effective sun protection, making every day a safe adventure under the sky.</h3>
                <button className="Button Tracker"  onClick={onTryClick}>Try G'day UV</button>
            </div>
            <div>
                <img src="UV_1.png" alt="" />
            </div>
        </div>
    )
}