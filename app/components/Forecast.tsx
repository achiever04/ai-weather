import type { ForecastDay } from '../services/weatherService';
import { useMemo } from 'react';

interface ForecastProps {
  forecast: ForecastDay[] | null;
}

export default function Forecast({ forecast }: ForecastProps) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  const aiInsight = useMemo(() => {
    const tempChanges = forecast.map((day) => (day.maxTemp + day.minTemp) / 2);
    const descriptions = forecast.map((day) => day.description.toLowerCase());
    const avgTempChange = tempChanges[tempChanges.length - 1] - tempChanges[0];
    const rainDays = descriptions.filter((desc) => desc.includes('rain')).length;

    if (rainDays >= 3) {
      return "Expect a rainy week ahead based on multiple rainy day forecasts.";
    } else if (avgTempChange > 3) {
      return "Warming trend expected with higher temperatures later this week.";
    } else if (avgTempChange < -3) {
      return "Cooling trend expected with lower temperatures approaching.";
    } else {
      return "Stable weather expected with slight day-to-day variations.";
    }
  }, [forecast]);

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
          <p className="text-gray-700">{aiInsight}</p>
        </div>
      </div>
    </div>
  );
}
