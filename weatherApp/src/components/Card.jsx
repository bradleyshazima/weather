import React, { useEffect } from 'react'
import {
  Rain, Rain2, Rain3, Snow, SnowCloud, Sun, SunCloud, SunRain, Thunder
} from '../assets/icons'
import { motion, useMotionValue } from "framer-motion";

const Card = ({ city, weather, setIcon }) => {
  if (!weather) return null

  const desc = weather.condition.toLowerCase()

  let icon = SunCloud
  if (desc.includes('clear')) icon = Sun
  else if (desc.includes('cloud')) icon = SunCloud
  else if (desc.includes('rain')) icon = Rain
  else if (desc.includes('drizzle')) icon = Rain2
  else if (desc.includes('snow')) icon = Snow
  else if (desc.includes('thunder')) icon = Thunder
  else if (desc.includes('mist') || desc.includes('fog')) icon = SnowCloud

  useEffect(() => {
    if (setIcon) setIcon(icon)
  }, [icon, setIcon])

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const offsetX = (e.clientX - window.innerWidth / 4) / 50
      const offsetY = (e.clientY - window.innerHeight / 4) / 50
      x.set(offsetX/2)
      y.set(offsetY/2)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  return (
    <motion.div
      className="flex flex-col items-center justify-between py-10 absolute inset-0 m-auto h-fit w-[260px] gap-8 rounded-[40px] bg-white/10 backdrop-blur-[20px] z-10"
      drag
      dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
      dragElastic={0.5}
      dragSnapToOrigin
      style={{
        x, y,
        border: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow:
          'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      }}
    >
      <p className='w-fit text-center text-white text-[20px] font-medium' style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)' }}>
        {city.name}, {city.countrycode}
      </p>
      <img src={icon} className='w-32 h-auto' alt={weather?.condition || 'Weather'} />
      <p className='w-fit text-center text-white text-[40px] font-medium sf' style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)' }}>
        {weather?.temp}°C
      </p>
    </motion.div>
  )
}

export default Card
