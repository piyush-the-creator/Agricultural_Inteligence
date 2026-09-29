import { WeatherData } from "@/types/weather";

export const DEMO_WEATHER: WeatherData = {
  isDemo: true,
  temperature: 29.2,
  condition: "Partly Cloudy",
  humidity: 64,
  windSpeed: 11.4,
  windDirection: "WNW",
  rainfallNext24h: 4.5,
  rainfallNext48h: 18.0,
  rainfallNext7Days: 24.0,
  evapotranspirationDaily: 3.2,
  source: "Open-Meteo (ECMWF Ensemble)",
  forecast: [
    { date: "Day 1", temperature: 29, precipitation: 4.5 },
    { date: "Day 2", temperature: 27, precipitation: 13.5 },
    { date: "Day 3", temperature: 26, precipitation: 6.0 },
    { date: "Day 4", temperature: 28, precipitation: 0.0 },
    { date: "Day 5", temperature: 30, precipitation: 0.0 },
    { date: "Day 6", temperature: 31, precipitation: 0.0 },
    { date: "Day 7", temperature: 31, precipitation: 0.0 },
  ],
};
