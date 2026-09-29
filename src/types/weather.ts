export interface WeatherForecastDay {
  date: string;
  temperature: number;
  precipitation: number;
}

export interface WeatherData {
  isDemo?: boolean;
  temperature: number;
  condition: string;
  humidity?: number;
  rainfallNext24h?: number;
  rainfallNext48h?: number;
  rainfallNext7Days?: number;
  windSpeed?: number;
  windDirection?: string;
  evapotranspirationDaily?: number;
  forecast?: WeatherForecastDay[];
  source: string;
}
