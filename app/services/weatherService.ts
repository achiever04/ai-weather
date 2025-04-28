// We'll use axios in a real implementation, but for now we're using mock data
// import axios from 'axios';

// We'll use OpenWeather API as an example
// In a real application, you would use a proper API key stored securely
// const API_KEY = 'YOUR_API_KEY'; // Replace with actual API key for production
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';

import axios from 'axios';

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(location: string): Promise<WeatherData> {
  const currentWeatherUrl = `${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`;

  const [currentWeatherRes, forecastRes] = await Promise.all([
    axios.get(currentWeatherUrl),
    axios.get(forecastUrl),
  ]);

  const currentWeather = currentWeatherRes.data;
  const forecastData = forecastRes.data.list;

  const forecast: ForecastDay[] = forecastData
    .filter((_: any, index: number) => index % 8 === 0)
    .map((day: any) => ({
      date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      minTemp: Math.round(day.main.temp_min),
      maxTemp: Math.round(day.main.temp_max),
      description: day.weather[0].description,
      icon: day.weather[0].icon,
    }));

  return {
    location: currentWeather.name,
    temperature: Math.round(currentWeather.main.temp),
    description: currentWeather.weather[0].description,
    icon: currentWeather.weather[0].icon,
    humidity: currentWeather.main.humidity,
    windSpeed: Math.round(currentWeather.wind.speed),
    feelsLike: Math.round(currentWeather.main.feels_like),
    forecast,
  };
}
