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
    <div className='w-[320px] h-fit flex flex-col absolute top-[100px] left-[100px] gap-2'>
      <h2 className='text-3xl text-white font-medium sf'>{city.name}, {city.country}</h2>
      <p className='text-[#0F0F0F] text-lg text-justify'>{summary}</p>
    </div>
  )
}

export default Info
