// src/types/weather.types.ts

/**
 * Base weather data structure
 */
export interface WeatherData {
    temp: number | null;
    humidity: number | null;
    feelsLike: number | null;
  }
  
  /**
   * WeatherStack API response structure
   */
  export interface WeatherStackResponse {
    current: {
      temperature: number;
      humidity: number;
      feelslike: number;
      weather_descriptions: string[];
      wind_speed: number;
      wind_dir: string;
      pressure: number;
      precip: number;
      cloudcover: number;
      visibility: number;
      is_day: string;
    };
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
    };
    error?: {
      code: number;
      type: string;
      info: string;
    };
  }
  
  /**
   * Props for WeatherDisplay component
   */
  export interface WeatherDisplayProps {
    weather: WeatherData;
    isLoading?: boolean;
    unit?: 'F' | 'C';
  }
  
  /**
   * Combined weather state for both campuses
   */
  export interface WeatherState {
    csb: WeatherData;
    sju: WeatherData;
  }