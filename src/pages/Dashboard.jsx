import logo from "../assets/icon.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "axios";
import { authService } from "../services/auth";
import { dataService } from "../services/data"; // Ensure you're importing the updated dataService

const Dashboard = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          navigate("/login");
          return;
        }
        setUser(currentUser);
      } catch (error) {
        console.error("Auth error:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`
        );
        setWeather(response.data);

        // Save weather data to Appwrite using the correct collection ID from appwrite.js
        await dataService.saveWeatherData({
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          precipitation: response.data.rain ? response.data.rain["1h"] : 0,
          condition: response.data.weather[0].description,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchWeather();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("username");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 text-white flex flex-col">
      <header className="flex justify-between items-center p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Vitalis Logo"
            className="h-10 w-10 object-cover rounded-full"
          />
          <h1 className="text-2xl font-bold">Vitalis Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Welcome, {user?.name}</span>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center gap-12 px-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8 text-left">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Temperature</h2>
            <p>{weather ? `${weather.main.temp} °C` : "Loading..."}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Humidity</h2>
            <p>{weather ? `${weather.main.humidity} %` : "Loading..."}</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Precipitation</h2>
            <p>
              {weather && weather.rain
                ? `${weather.rain["1h"]} mm`
                : "No rain data"}
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-2">Condition</h2>
            <p>{weather ? weather.weather[0].description : "Loading..."}</p>
          </div>
        </div>

        <div className="flex gap-8">
          <Button size="lg" className="px-10 text-lg">
            Soil Health
          </Button>
          <Button size="lg" className="px-10 text-lg">
            Plant Disease Detection
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
