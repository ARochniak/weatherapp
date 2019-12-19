import React, { useState, useEffect } from 'react';

import Hours from "./Components/Hours";
import Days from "./Components/Days";
import TempList from "./Components/TempList";

import './App.css';

function App() {
  const [weatherState, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect( () => {
    // save weather object in localStorage for 3 hours
    const limit = 3*3600*1000;
    const localStorageInitTime = localStorage.getItem('localStorageInitTime');
    if (localStorageInitTime === null) {
      localStorage.setItem('localStorageInitTime', +new Date());
    } else if (+new Date() - localStorageInitTime > limit) {
      localStorage.clear();
      localStorage.setItem('localStorageInitTime', +new Date());
    }

    const weather = localStorage.getItem('weather');
    if (weather) {
      setWeather(JSON.parse(weather));
      return;
    }

    const weatherByCoords = async (coords) => {
      const {latitude, longitude} = coords;
      let weather;
      try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?APPID=373a158eb6eb097745db5c80be9b3eaf&lat=${latitude}&lon=${longitude}`);
        weather = await response.json();
      } catch (err) {
        return err;
      }
        return weather;
    }

    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition( async (position) => {
        const weatherResponse = await weatherByCoords(position.coords);
        if (weatherResponse instanceof Error) 
          setError(weatherResponse.message);
        else { 
          localStorage.setItem('weather', JSON.stringify(weatherResponse));
          setWeather(weatherResponse);
        }
      }, (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`)
      }, options);
    } else {
      alert("Turn on geolocation");
    }
  }, [])

  return (
    <div className="App">
      {
        !weatherState && !error ? 
        <h1>Loading...</h1> : error ? (<h1>{error}</h1>) : (
        <>
          <h1>{weatherState.city.name}</h1>
          <div className="wrapper">
            <div className="hours">
              <Hours />
            </div>
            <div className="days">
              <Days today={weatherState.list[0].dt*1000}/>
            </div>
            <div className="tempList">
              <TempList list={weatherState.list} />
            </div>

          </div>
        </>
        )
      }
    </div>
  );
}

export default App;
