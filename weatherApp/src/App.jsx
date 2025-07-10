import { useState, useEffect } from 'react'
import './App.css'
import { Card, Carousel, Info, Time } from './components'
import { CITY_DATA } from './constants/cities'
import { useWeather } from './hooks/useWeather'
import { getAdviceFromIcon } from './hooks/getAdvice'
import { AnimatePresence, motion } from 'framer-motion'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeCity, setActiveCity] = useState(CITY_DATA[0])
  const [activeIcon, setActiveIcon] = useState(null)
  const [transitioning, setTransitioning] = useState(false)

  const [cityKey, setCityKey] = useState(0) // Key for resetting animation

  const imageCache = useRef({})
  const { weather } = useWeather(activeCity)

  useEffect(() => {
    const preloadImages = async () => {
      const promises = CITY_DATA.map((city) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = city.bg

          img.onload = () => {
            imageCache.current[city.code] = img // ✅ Store loaded image
            resolve()
          }

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

    preloadImages()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="loader"></div>
      </div>
    )
  }

  const advice = getAdviceFromIcon(activeIcon)

  const handleCityChange = (code) => {
    const selected = CITY_DATA.find((city) => city.code === code)
    if (!selected || transitioning) return

    setTransitioning(true)

    // Step 1: Animate out
    setTimeout(() => {
      // Step 2: Change city and bg
      setActiveCity(selected)

      // Step 3: Animate in
      setTimeout(() => {
        setCityKey((prev) => prev + 1)
        setTransitioning(false)
      }, 800)
    }, 1000)
  }

  return (
    <main
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ 
        backgroundImage: imageCache.current[activeCity.code]
          ? `url(${imageCache.current[activeCity.code].src})`
          : `url(${activeCity.bg})`,
      }}
    >
      <AnimatePresence mode="wait">
        {!transitioning && (
          <motion.div
            key={cityKey}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            bounce='0.5'
            className="w-full h-full relative"
          >
            <Info city={activeCity} />
            <Time city={activeCity} />
            <Card city={activeCity} weather={weather} setIcon={setActiveIcon} />

            {activeIcon && (
              <motion.div
                className="text-white sf text-[24px] font-medium absolute right-[100px] bottom-[64px] px-8 py-4 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-[20px]"
                style={{
                  textShadow: '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
                  border: '1px solid rgba(255, 255, 255, 0.7)',
                  boxShadow:
                    'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                }}
                drag
                dragConstraints={{ top: -100, bottom: 100, left: -100, right: 100 }}
                dragElastic={0.5}
                dragSnapToOrigin={true}
              >
                {advice}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Carousel onSelectCity={handleCityChange} />
    </main>
  )
}

export default App
