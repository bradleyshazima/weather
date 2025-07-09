import { useState } from 'react'
import './App.css'
import { Card, Carousel, Info, Time } from './components'
import { CITY_DATA } from './constants/cities'

function App() {
  const bgImage = "https://res.cloudinary.com/bradley-cdn/image/upload/f_auto,q_auto/v1752001468/newyork_scnwns.jpg"
  const [activeCity, setActiveCity] = useState(CITY_DATA[0])

  return (
    <main
      className="w-full h-screen bg-cover bg-top flex"
      style={{ backgroundImage: `url(${bgImage})` }}
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
      <Carousel onSelectCity={(code) => {
        const selected = CITY_DATA.find(city => city.code === code)
        if (selected) setActiveCity(selected)
      }} />
    </main>
  )
}

export default App
