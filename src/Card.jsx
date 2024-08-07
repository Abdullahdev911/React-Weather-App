import React from 'react'
import { useEffect, useState, useRef } from "react";


function Card() {
  const [weatherData, setWeatherData] = useState('');
  const inputref = useRef();


  async function fetchinfo(city) {

    if(city === ''){
      alert('enter city name')
      return;
    }
    try {

      const key = import.meta.env.VITE_API_KEY;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
      }
      console.log(data);
      setWeatherData({
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        city: data.name,
        wind: data.wind.speed,
        icon: data.weather[0].icon,
        description: data.weather[0].description
      });
    }
    catch (error) {
     setWeatherData(false);
    
    }
    console.log(weatherData);

  }

  useEffect(() => {
    fetchinfo('karachi');
  }, []);
  return (
    <>
      <div className="main-container">

        <div className="card">

          <div className="search-bar">
            <input type="text" ref={inputref} placeholder='Search...' />
            <button onClick={() => fetchinfo(inputref.current.value)}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          {weatherData && (<><div className="weather-icon">
            <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="" />
            <div className="weather-desc">{weatherData.description}</div>
          </div>

          <div className="weather-detail">
            <div className="weather-temp">
              {weatherData.temp}°C
            </div>
            <div className="location">
              {weatherData.city}
            </div>
          </div>

          <div className="further-detail">

            <div className="further-detail-container">
              <div className="icon">
                <i class="fa-solid fa-droplet"></i>
              </div>

              <div className="detail-container">

                <div className="weather-stats">
                  {weatherData.humidity}%
                </div>

                <div className="title">
                  Humidity
                </div>

              </div>
            </div>

            <div className="further-detail-container">
              <div className="icon">
                <i class="fa-solid fa-wind"></i>
              </div>

              <div className="detail-container">

                <div className="weather-stats">
                  {weatherData.wind} Km/h
                </div>

                <div className="title">
                  Wind Speed
                </div>

              </div>
            </div>



          </div></>) }

          

        </div>
      </div>
    </>
  )
}

export default Card