// src/Component/weatherApp/WeatherApp.js
import React, { useState, useEffect } from 'react';
import { TiWeatherPartlySunny } from "react-icons/ti";
import './weather.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Toshkent');
  const [inputCity, setInputCity] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('Shahar nomini kiriting');
  const API_KEY = '8ece5c654dbfddbb10a2e203e994cfbf';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        if (!response.ok) {
          throw new Error(`Bunday shahar yo'q`);
        }

        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Xatolik yuz berdi:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
    setError(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!inputCity.trim()) {
      setInputPlaceholder('Shahar nomini kiriting!');
      return;
    }

    setCity(inputCity);
    setLoading(true);
  };

  if (loading) {
    return <p>Yuklanmoqda...</p>;
  }

  return (
    <div className='container'>
      {weatherData && weatherData.main && weatherData.weather ? (
        <div className='col shadow'>
          <TiWeatherPartlySunny size={250} className='icon' />
          <h1>{weatherData.name} ob-havosi</h1>
          <p>Harorat: {Math.round(weatherData.main.temp)}°C</p>
          <p>Ob-havo: {weatherData.weather[0].description}</p>
          <form onSubmit={handleSearch}>
            <div className='form'>
              <input
              className='input'
                type="text"
                value={inputCity}
                onChange={handleInputChange}
                placeholder={inputPlaceholder}
              />
              <button type="submit" className='btn bg-primary'>Qidirish</button>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>} {/* Xato xabarini ko'rsatish */}
        </div>
      ) : (
        <p>Ma'lumotni yuklashda xatolik yuz berdi.</p>
      )}
    </div>
  );
};

export default WeatherApp;
