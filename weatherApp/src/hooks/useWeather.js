// src/hooks/useWeather.js
import { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_WEATHER_API

export const useWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!lat || !lon) return

    const fetchWeather = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        )
        const data = await res.json()
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
        })
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch weather')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [lat, lon])

  return { weather, loading, error }
}
