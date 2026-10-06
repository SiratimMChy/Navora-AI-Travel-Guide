import { useEffect, useState } from "react";
import Image from "next/image";
import { FaGlobe } from "react-icons/fa";

export default function WeatherWidget({ location }: { location?: string }) {
  const [weather, setWeather] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    if (location) {
      const fetchWeather = async () => {
        setWeatherLoading(true);
        try {
          const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
          if (!apiKey) {
            setWeatherError("Unavailable");
            setWeatherLoading(false);
            return;
          }
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
          if (!res.ok) throw new Error("Failed to fetch weather");
          const data = await res.json();
          setWeather(data);
        } catch (err) {
          setWeatherError("Unavailable");
        } finally {
          setWeatherLoading(false);
        }
      };
      fetchWeather();
    }
  }, [location]);

  return (
    <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
      <div className="absolute -top-10 -right-10 text-white/10">
        <FaGlobe size={150} />
      </div>
      <h3 className="text-lg font-bold mb-4 relative z-10 flex items-center gap-2">
        Current Weather
      </h3>
      {weatherLoading ? (
        <div className="flex justify-center py-6 relative z-10"><span className="loading loading-spinner loading-md text-white" /></div>
      ) : weatherError ? (
        <div className="text-sm bg-white/20 p-4 rounded-xl text-center relative z-10 font-medium border border-white/20">
          Weather data is temporarily unavailable.
        </div>
      ) : weather ? (
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold tracking-tighter">{Math.round(weather.main.temp)}°<span className="text-3xl text-white/80">C</span></p>
              <p className="text-white/90 capitalize font-medium text-sm mt-1">{weather.weather[0].description}</p>
            </div>
            <div className="bg-white/20 rounded-full p-2 backdrop-blur-md">
              <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" width={70} height={70} className="drop-shadow-lg" />
            </div>
          </div>
          <div className="flex gap-6 mt-4 pt-4 border-t border-white/20 text-sm text-white/90">
            <div className="flex flex-col"><span className="text-white/70 text-xs mb-1">Humidity</span><span className="font-semibold text-base">{weather.main.humidity}%</span></div>
            <div className="flex flex-col"><span className="text-white/70 text-xs mb-1">Wind</span><span className="font-semibold text-base">{weather.wind.speed} m/s</span></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
