import { useState, useEffect } from 'react'
import './App.css'
import { Card, Carousel, Info, Time } from './components'
import { CITY_DATA } from './constants/cities'
import { useWeather } from './hooks/useWeather'
import { getAdviceFromIcon } from './hooks/getAdvice'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeCity, setActiveCity] = useState(CITY_DATA[0])
  const [activeIcon, setActiveIcon] = useState(null) // ⬅️ new state
  const { weather } = useWeather(activeCity)

  useEffect(() => {
    const loadImages = async () => {
      const promises = CITY_DATA.map(city => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = city.bg
          img.onload = resolve
          img.onerror = reject
        })
      })

      try {
        await Promise.all(promises)
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading images:', err)
        setIsLoading(false)
      }
    }

    loadImages()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <span className="text-lg sf animate-pulse">Loading...</span>
      </div>
    )
  }

  // Get advice from icon
  const advice = getAdviceFromIcon(activeIcon)

  return (
    <main
      className="w-full h-screen bg-cover bg-center flex"
      style={{ backgroundImage: `url(${activeCity.bg})` }}
    >
      <Info city={activeCity} />
      <Time city={activeCity} />
      <Card city={activeCity} weather={weather} setIcon={setActiveIcon} /> {/* ⬅️ pass setIcon */}
      
      {/* Advice follows icon */}
      {activeIcon && (
        <span
          className="text-white sf text-[24px] font-medium absolute right-[100px] bottom-[100px] px-8 py-4 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-[20px]"
          style={{
            textShadow:
              '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow:
              'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          }}
        >
          {advice}
        </span>
      )}

      <Carousel
        onSelectCity={(code) => {
          const selected = CITY_DATA.find((city) => city.code === code)
          if (selected) {
            setTimeout(() => {
              setActiveCity(selected)
            }, 500)
          }
        }}
      />
    </main>
  )
}

export default App
