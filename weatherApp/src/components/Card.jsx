import React from 'react'
import { Rain, Rain2, Rain3, Snow, SnowCloud, SnowRain, Sun, SunCloud, SunRain, Thunder, ThunderRain } from '../assets/icons'

const Card = () => {
  return (
    <div
      className="flex flex-col items-center justify-between py-10 absolute inset-0 m-auto h-fit w-[260px] gap-8 rounded-[40px] bg-white/10 backdrop-blur-[20px] z-10"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow:
          'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      }}
    >
      <p 
        className='w-fit text-center text-white text-[20px] font-medium'
        style={{
            textShadow:
            '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        }}
      >New York, US</p>
      <img src={SunCloud} className='w-32 h-auto' alt="" />
      <p className='w-fit text-center text-white text-[40px] font-medium sf'>32<span className='align-super text-lg'>°C</span></p>
    </div>
  )
}

export default Card
