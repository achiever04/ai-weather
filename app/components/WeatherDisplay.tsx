import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import type { WeatherData } from '../services/weatherService';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  loading: boolean;
}

export default function WeatherDisplay({ weatherData, loading }: WeatherDisplayProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="text-center p-10">
        <p className="text-gray-600">Enter a location to get weather information</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{weatherData.location}</h2>
          <p className="text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} 
            alt={weatherData.description}
            className="w-16 h-16"
          />
          <div className="ml-2">
            <div className="text-4xl font-bold text-gray-800">{weatherData.temperature}°C</div>
            <p className="text-gray-600 capitalize">{weatherData.description}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center bg-blue-50 p-4 rounded-lg">
          <WiThermometer className="text-blue-500 text-3xl" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Feels Like</p>
            <p className="text-lg font-semibold">{weatherData.feelsLike}°C</p>
          </div>
        </div>
        
        <div className="flex items-center bg-blue-50 p-4 rounded-lg">
          <WiHumidity className="text-blue-500 text-3xl" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-lg font-semibold">{weatherData.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center bg-blue-50 p-4 rounded-lg">
          <WiStrongWind className="text-blue-500 text-3xl" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="text-lg font-semibold">{weatherData.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
} 