import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  const capital = Array.isArray(country.capital)
    ? country.capital[0]
    : country.capital;

  useEffect(() => {
    if (!capital) return;

    weatherService
      .getByCity(capital)
      .then((data) => {
        console.log("Weather data:", data);
        setWeather(data);
        setWeatherError(null);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
        setWeather(null);
        setWeatherError("Could not fetch weather data");
      });
  }, [capital]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {country.population}</p>

      <h2>Spoken Languages</h2>
      <ul>
        {Object.values(country.languages || {}).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

      <h2>Weather in {capital}</h2>

      {weatherError && <p>{weatherError}</p>}

      {weather && (
        <>
          <p>temperature: {weather.main.temp} °C</p>
          {weather.weather?.[0] && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          )}
          <p>wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default Country;
