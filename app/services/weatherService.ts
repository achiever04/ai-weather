// We'll use axios in a real implementation, but for now we're using mock data
// import axios from 'axios';

// We'll use OpenWeather API as an example
// In a real application, you would use a proper API key stored securely
// const API_KEY = 'YOUR_API_KEY'; // Replace with actual API key for production
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  icon: string;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
}

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    // Using demo mode to avoid needing a real API key
    // In a real application, you would use:
    // const response = await axios.get(`${BASE_URL}/weather?q=${location}&units=metric&appid=${API_KEY}`);
    
    // For demo purposes, returning mock data
    return getMockWeatherData(location);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

// Mock data for demo purposes
const getMockWeatherData = (location: string): WeatherData => {
  const currentDate = new Date();
  const forecast = Array.from({ length: 5 }, (_, i) => {
    const forecastDate = new Date();
    forecastDate.setDate(currentDate.getDate() + i + 1);
    
    return {
      date: forecastDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      minTemp: Math.round(15 + Math.random() * 5),
      maxTemp: Math.round(20 + Math.random() * 10),
      description: i % 2 === 0 ? 'Partly Cloudy' : 'Sunny',
      icon: i % 2 === 0 ? '03d' : '01d'
    };
  });

  return {
    location,
    temperature: Math.round(20 + Math.random() * 10),
    description: 'Partly Cloudy',
    feelsLike: Math.round(19 + Math.random() * 10),
    humidity: Math.round(40 + Math.random() * 40),
    windSpeed: Math.round(5 + Math.random() * 15),
    icon: '03d',
    forecast
  };
}; 