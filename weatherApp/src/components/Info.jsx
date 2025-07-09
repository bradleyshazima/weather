import React, { useEffect, useRef, useState } from 'react'

const Info = ({ city }) => {
  const [summary, setSummary] = useState('Loading summary...')
  const cache = useRef({})  // 🔸 This object holds cached summaries

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

    // 🔸 Use cached version if available
    if (cache.current[title]) {
      setSummary(cache.current[title])
      return
    }

    // 🔸 Otherwise fetch it
    const fetchSummary = async () => {
      try {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
        const data = await res.json()
        if (data.extract) {
          cache.current[title] = data.extract // store in cache
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
    <div className='w-[320px] h-fit flex flex-col absolute top-[100px] left-[100px] gap-2 z-10'>
      <h2 
        className='text-3xl text-white font-medium sf'
        style={{
          textShadow:
          '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        }}

      >{city.name}, {city.country}</h2>
      <div 
        className='h-[400px] w-full p-4 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-[20px]'
        style={{
        border: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow:
          'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        }}
        >
        <div
          className="flex flex-col max-h-[400px] overflow-x-auto w-full gap-8 rounded-2xlgroup custom-scroll"
        >
          <p 
            className='text-white text-[17px] text-justify mb-4'
            style={{
              textShadow:
              '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
            }}
          >{summary}</p>
        </div>
      </div>
    </div>
  )
}

export default Info
