// src/lib/weather.ts
import { WeatherData, WeatherStackResponse } from '@/types/weather.types';

const API_KEY = 'c2849578d38b2f29a659895b60acea8b';
const BASE_URL = 'http://api.weatherstack.com/current';

const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchWeather(location: string): Promise<WeatherData> {
  try {
    // Check cache first
    const cached = weatherCache.get(location);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`Using cached weather data for ${location}`);
      return cached.data;
    }

    console.log(`Fetching weather for ${location}...`);
    const url = new URL(BASE_URL);
    url.searchParams.append('access_key', API_KEY);
    url.searchParams.append('query', location);
    url.searchParams.append('units', 'f');

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json() as WeatherStackResponse;

    if (data.error) {
      console.error('API Error:', data.error);
      throw new Error(data.error.info || 'API Error');
    }

    const weatherData: WeatherData = {
      temp: data.current?.temperature ?? null,
      humidity: data.current?.humidity ?? null,
      feelsLike: data.current?.feelslike ?? null
    };

    weatherCache.set(location, {
      data: weatherData,
      timestamp: Date.now()
    });

    return weatherData;
  } catch (error) {
    console.error('Failed to fetch weather for', location, ':', error);
    return {
      temp: null,
      humidity: null,
      feelsLike: null
    };
  }
}

export function clearWeatherCache(): void {
  weatherCache.clear();
}

export function isWeatherCached(location: string): boolean {
  const cached = weatherCache.get(location);
  return Boolean(cached && Date.now() - cached.timestamp < CACHE_DURATION);
}