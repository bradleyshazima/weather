import { useState, useEffect } from 'react'
import './App.css'
import { Card, Carousel, Info, Time } from './components'
import { CITY_DATA } from './constants/cities'

function App() {
  const bgImage = "https://res.cloudinary.com/bradley-cdn/image/upload/f_auto,q_auto/v1752001468/newyork_scnwns.jpg"
  const [isLoading, setIsLoading] = useState(true)
  const [activeCity, setActiveCity] = useState(CITY_DATA[0])

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
      setIsLoading(false) // optionally still show app even if some fail
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


  return (
    <main
      className="w-full h-screen bg-cover bg-center flex"
      style={{ backgroundImage: `url(${activeCity.bg})` }}
    >
      <Info />
      <Time />
      <Card />
      <span className='text-white sf text-[24px] font-medium absolute right-[100px] bottom-[100px]'
          style={{
              textShadow:
              '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
          }}
      >Wear light clothing today</span>
      <Carousel
        onSelectCity={(code) => {
          const selected = CITY_DATA.find((city) => city.code === code)
          if (selected) {
            // Wait 500ms before updating background
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
