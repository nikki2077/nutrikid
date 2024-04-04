import React, { useState, useEffect } from 'react';
import './Tracker.css';

const Tracker = () => {
    const apiKey = '9aa73feb7fb935f616f7d80eadb6c330';
    const [cityName, setCityName] = useState('Melbourne'); 
    const [date, setDate] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [weather, setWeather] = useState({ temp: '', condition: '', icon: '', uvi: '', uviLevel: '' });
    const [uvLevelRecommendation, setUvLevelRecommendation] = useState({ level: '', message: '' });

    const setCurrentDate = () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()} ${getMonth(currentDate.getMonth())}, ${currentDate.getFullYear()}`;
        setDate(formattedDate);
    };

    const handleLocationInputChange = (event) => {
        setLocationInput(event.target.value);
      };

      const handleSearch = () => {
        if (/^\d{4}$/.test(locationInput)) {
            convertToCoordinatesUsingZip(locationInput, 'AU');
        } else {
            fetchWeatherByLocation(locationInput, 'AU');
        }
    };

    const fetchWeatherByLocation = async (location, countryCode) => {
        const geocodeApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location},${countryCode}&limit=1&appid=${apiKey}`;
        try {
            const geoResponse = await fetch(geocodeApiUrl);
            const geoData = await geoResponse.json();
            if (geoData && geoData.length > 0) {
                const { lat, lon } = geoData[0];
                getWeather(lat, lon);
                setCityName(location.charAt(0).toUpperCase() + location.slice(1));
            } else {
                console.error('Location not found');
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    const convertToCoordinatesUsingZip = async (zipCode, countryCode) => {
        const zipApiUrl = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`;
        try {
            const response = await fetch(zipApiUrl);
            const data = await response.json();
            if (data.lat && data.lon) {
                let location = data.name
                setCityName(location.charAt(0).toUpperCase() + location.slice(1));
                getWeather(data.lat, data.lon);
            } else {
                console.error('Location not found for the provided zip code.');
            }
        } catch (error) {
            console.error('Error fetching coordinates from zip code:', error);
        }
    };
    

     const getUvLevelRecommendation = (uvi) => {
        let level = getUVILevel(uvi);
        let message;
        switch (level) {
            case 'Low':
                message = 'You can safely enjoy being outside!';
                break;
            case 'Medium':
                message = 'Seek shade during midday hours! Slip on a shirt, slop on sunscreen, and slap on a hat!';
                break;
            case 'High':
                message = 'Avoid being outside during midday hours! Make sure you seek shade! Shirt, sunscreen, and hat are a must!';
                break;
            default:
                message = 'There is an error determining the UV level.';
        }
        return { level, message };
    };

    const getWeather = async (latitude, longitude) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const uvi = Math.floor(data.current.uvi);
            const temp = Math.round(data.current.temp);
            const condition = data.current.weather[0].main;
            const icon = data.current.weather[0].icon;
            const uviLevel = getUVILevel(uvi);
            const { level, message } = getUvLevelRecommendation(uvi);

            setWeather({ temp, condition, icon, uvi, uviLevel });
            setUvLevelRecommendation({level, message})
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const getUVILevel = (uvi) => {
        if (uvi < 3) return 'Low';
        else if (uvi < 7) return 'Medium';
        else return 'High';
    };

    useEffect(() => {
        const { level, message } = getUvLevelRecommendation(weather.uvi);
        const latitude = -37.8136;
        const longitude = 144.9631;
        
        getWeather(latitude, longitude);
        setCurrentDate();
        fetchWeatherByLocation('Melbourne', 'AU');
    }, []);

    function getMonth(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }
    
    return (
        <div className="weather-wrapper">
            <div className='info'>
                <div className='right-colunmn'>
                    <div className="City">
                        <div className="March2024"><h1>{date}</h1></div>
                        <div className="NowLocation">
                            <div className="LocalizationIcon">{<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>}</div>
                            <div className="Melbourne"><h1>{cityName}</h1></div>
                        </div>
                    </div>
                    <div className="Icon">
                        <img className="Shadow" src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather Icon" />
                    </div>
                </div>
                <div className='left-column'>
                <div className="SearchLocation">
                        <div className="search-input-box">
                            <input type="text" id="locationInput" placeholder="Enter suburb or postcode" value={locationInput} onChange={handleLocationInputChange}/>
                        </div>
                        <button id="searchButton" onClick={handleSearch} aria-label="Search"> 🔍 </button>
                    </div>
                    
                    <div className="Numbers">
                        <div className="Temp">
                            <h1>{weather.temp}°C</h1>
                        </div>
                        <div>
                            <div className="Cloud"><h3>{weather.condition}</h3></div>
                        </div>
                        <div className="UvLevel">
                            <div className="L3">
                                <h1>UV Index: {weather.uvi}</h1></div>
                            
                        </div>
                        <div><div className="High"><h3>{weather.uviLevel}</h3></div></div>
                    </div>
                </div>
            </div>
            <div className='Message'>
                <h1>Recommentation</h1>
               <h4> Today's UV level is {uvLevelRecommendation.level}. {uvLevelRecommendation.message}</h4>

            {/* <footer>
               <p> UV Index Guide: </p>
               <p>0–2 indicates a low danger from the sun's rays;</p>
               <p> 3–6 suggests a moderate risk; </p>
               <p>levels 7 and above signify a high risk.</p>
            </footer> */}
            </div>

        </div>
    )
}

export default Tracker;
