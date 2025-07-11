import React, { useEffect, useRef, useState } from 'react'
import { BlurText} from '../components'

const Info = ({ city }) => {
  const [summary, setSummary] = useState('Loading summary...')
  const cache = useRef({})

  const scrollRef = useRef(null)

  // Slow scroll in summary
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e) => {
      if (e.deltaY === 0) return
      e.preventDefault()
      el.scrollTop += e.deltaY * 0.1
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(() => {
    if (!city?.name) return

    const wikiTitleMap = {
      'New York': 'New_York_City',
      'Seoul': 'Seoul',
      'Tokyo': 'Tokyo',
      'Nairobi': 'Nairobi',
      'Bangkok': 'Bangkok',
      'Dubai': 'Dubai',
      'Rome': 'Rome',
      'Paris': 'Paris',
      'Toronto': 'Toronto',
      'London': 'London',
    }

    const title = wikiTitleMap[city.name] || city.name

    if (cache.current[title]) {
      setSummary(cache.current[title])
      return
    }

    const fetchSummary = async () => {
      try {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
        const data = await res.json()
        if (data.extract) {
          cache.current[title] = data.extract
          setSummary(data.extract)
        } else {
          setSummary('No summary available.')
        }
      } catch (err) {
        setSummary('Failed to fetch summary.')
        console.error(err)
      }
    }

    fetchSummary()
  }, [city])

return (
  <div 
    className='hidden lg:flex scale-80 lg:scale-90
              w-[320px] h-fit flex-col items-center
              lg:items-start absolute top-8 left-1/2
              lg:left-16 lg:top-16 transform -translate-x-1/2
              lg:translate-x-0 gap-2 z-10 2xl:scale-100 2xl:left-24 2xl:top-24'>
    <BlurText
      key={city.name}
      text={`${city.name}, ${city.country}`}
      delay={300}
      animateBy="words"
      direction="top"
      className='text-3xl text-white font-medium sf'
      style={{
        textShadow:
          '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
      }}
    />
    <div
      className=' h-[400px] w-full p-4 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-[20px]'
      style={{
        border: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow:
          'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      }}
    >
      <div
        ref={scrollRef}
        className="flex flex-col max-h-[400px] overflow-x-auto w-full gap-8 rounded-2xl group custom-scroll"
      >
        <p
          className="text-white text-[17px] text-justify mb-4"
          style={{
            textShadow:
              '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
          }}
        >
          {summary}
        </p>
      </div>
    </div>
  </div>
)
}

export default Info
