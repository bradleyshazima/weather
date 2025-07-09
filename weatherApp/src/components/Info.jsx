import React from 'react'

const Info = () => {
  return (
    <div className='w-[320px] h-fit flex flex-col absolute top-[100px] left-[100px] gap-2'>
        <h2 
          className='text-3xl text-white font-medium sf'
          style={{
            textShadow:
            '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
          }}
        >New York, United States</h2>
        <p className='w-full text-wrap text-[#0F0F0F] text-lg text-justify'
          style={{
            textShadow:
            '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
          }}
        >New York, United States, is a vibrant metropolis known for its iconic skyline, diverse culture, and fast-paced energy. Home to landmarks like Times Square, Central Park, and the Statue of Liberty, it blends history, art, and commerce. The city never sleeps and inspires millions with endless opportunity.</p>
    </div>
  )
}

export default Info