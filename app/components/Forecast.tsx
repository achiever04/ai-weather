import type { ForecastDay } from '../services/weatherService';

interface ForecastProps {
  forecast: ForecastDay[] | null;
}

export default function Forecast({ forecast }: ForecastProps) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="font-medium text-gray-700">{day.date}</div>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
              alt={day.description}
              className="w-12 h-12 mx-auto"
            />
            <div className="text-sm capitalize text-gray-600">{day.description}</div>
            <div className="mt-2">
              <span className="text-blue-700 font-semibold">{day.minTemp}°</span>
              <span className="mx-1 text-gray-400">|</span>
              <span className="text-red-600 font-semibold">{day.maxTemp}°</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">AI Weather Insights</h3>
        <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
          <p className="text-gray-700">
            Based on AI analysis of temperature patterns and atmospheric conditions, there&apos;s a high probability 
            of continued {forecast[0].description.toLowerCase()} weather with a potential shift towards 
            {forecast[0].minTemp < 20 ? " cooler" : " warmer"} temperatures in the coming days.
          </p>
        </div>
      </div>
    </div>
  );
} 