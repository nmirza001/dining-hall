// src/components/WeatherDisplay.tsx
import React from 'react';
import { Thermometer, Droplet, Wind } from 'lucide-react';
import { WeatherDisplayProps } from '@/types';

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weather,
  isLoading = false,
  unit = 'F'
}) => {
  const formatTemp = (temp: number | null): string => {
    return temp !== null ? `${temp}°${unit}` : `--°${unit}`;
  };

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg animate-pulse"
        aria-label="Loading weather data..."
      >
        <div className="h-6 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-28" />
      </div>
    );
  }

  const hasError = weather.temp === null && 
                  weather.humidity === null && 
                  weather.feelsLike === null;

  if (hasError) {
    return (
      <div
        className="flex flex-col gap-2 bg-red-50 p-4 rounded-lg text-red-600"
        aria-label="Error loading weather data"
      >
        <p className="text-sm">
          Unable to load weather data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg shadow-sm transition-all hover:shadow-md"
      aria-label="Weather data display"
    >
      <div className="flex items-center gap-2">
        <Thermometer className="h-5 w-5 text-blue-500" aria-hidden="true" />
        <span className="font-semibold text-lg">
          {formatTemp(weather.temp)}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Droplet className="h-4 w-4 text-blue-400" aria-hidden="true" />
        <span>
          {weather.humidity !== null ? `${weather.humidity}%` : '--'} humidity
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Wind className="h-4 w-4 text-gray-500" aria-hidden="true" />
        <span>
          Feels like {formatTemp(weather.feelsLike)}
        </span>
      </div>
    </div>
  );
};

export default WeatherDisplay;