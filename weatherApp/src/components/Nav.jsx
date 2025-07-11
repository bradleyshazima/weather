import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Profile } from '../assets/icons'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      className={`rounded-[40px] bg-white/10 backdrop-blur-[20px] 
                  z-10 absolute bottom-[140px] lg:bottom-16 left-1/2 lg:left-16 lg:-translate-0 -translate-1/2 px-0 transition-all duration-500 ease-in-out
                  flex items-center justify-center gap-4 h-20
                  ${isOpen ? 'w-52 px-4 delay-150' : 'w-20 px-0 delay-0'}
              `}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow:
          'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      }}
      drag
      dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
      dragElastic={0.5}
      dragSnapToOrigin
    >

      {/* GitHub - LEFT */}
      <a
        href={isOpen ? "https://www.github.com/bradleyshazima" : "#"}
        onClick={(e) => { if (!isOpen) e.preventDefault() }}
      >
        <span 
          className={`transition-all duration-500 ease-out
                     ${isOpen 
                        ? 'opacity-100 scale-100 translate-x-0 delay-150' 
                        : 'opacity-0 scale-75 translate-x-16 delay-0'}
                     flex items-center justify-center w-12 h-12 rounded-full bg-white/20`}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow:
              'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          }}
        >
          <i className="fa-brands fa-github text-3xl text-white"></i>
        </span>
      </a>

      {/* Profile Image - CENTER (always visible) */}
      <div 
        className="min-h-12 min-w-12 max-w-12 max-h-12 rounded-full overflow-hidden hover:scale-105 duration-300 ease-in-out"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow:
            'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        }}
      >
        <img 
            src={Profile} 
            alt="My profile" 
            className='w-full h-auto'
            onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* LinkedIn - RIGHT */}
      <a
        href={isOpen ? "https://www.linkedin.com/in/bradley-shazima-97bb90246/" : "#"}
        onClick={(e) => { if (!isOpen) e.preventDefault() }}
      >
        <span 
          className={`transition-all duration-500 ease-out
                     ${isOpen 
                        ? 'opacity-100 scale-100 -translate-x-0 delay-150' 
                        : 'opacity-0 scale-75 -translate-x-16 delay-0'}
                     flex items-center justify-center w-12 h-12 rounded-full bg-white/20`}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow:
              'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          }}
        >
          <i className="fa-brands fa-linkedin-in text-2xl text-white"></i>
        </span>
      </a>
    </motion.div>
  )
}

export default Nav
