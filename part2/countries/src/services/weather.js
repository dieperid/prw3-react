import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getByCity = async (city) => {
  if (!city) return Promise.reject(new Error("City is required"));

  const request = axios.get(
    `${baseUrl}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
  );

  const response = await request;
  return response.data;
};

export default { getByCity };
