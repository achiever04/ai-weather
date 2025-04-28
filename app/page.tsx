'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import { getWeatherData, type WeatherData } from './services/weatherService';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchLocation = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Optional: Load default location on first render
  useEffect(() => {
    handleSearchLocation('London');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Header onSearchLocation={handleSearchLocation} />
      
      <main className="container mx-auto p-4 md:p-8 max-w-5xl">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            {error}
          </div>
        )}
        
        <WeatherDisplay weatherData={weatherData} loading={loading} />
        
        {weatherData && !loading && (
          <Forecast forecast={weatherData.forecast} />
        )}
        
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">About AI Weather Prediction</h2>
          <p className="text-gray-700 mb-4">
            This application uses advanced AI models to provide accurate weather forecasts and intelligent
            insights about weather patterns. Our AI analyzes historical weather data, satellite imagery,
            and atmospheric conditions to predict weather with higher accuracy than traditional methods.
          </p>
          <p className="text-gray-700">
            The AI model continuously learns from new weather patterns and improves its predictions over time,
            adapting to changing climate conditions and local weather phenomena.
          </p>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} AI Weather Prediction | Created with Next.js</p>
          <p className="text-gray-400 text-sm mt-2">
            Weather data provided for demonstration purposes only
          </p>
        </div>
      </footer>
    </div>
  );
}
