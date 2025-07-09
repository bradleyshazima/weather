import React from 'react'

const Time = () => {
  return (
    <div className='flex flex-col gap-2 z-10 absolute right-[100px] top-[100px]'>
        <p className='text-white sf text-[24px] font-medium'
            style={{
                textShadow:
                '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
            }}
        >Wed, 25 June, 2025</p>
        <div 
            className='w-fit h-fit px-12 py-4 flex items-center justify-center rounded-2xl  text-[48px] text-white font-medium bg-white/10 backdrop-blur-[20px]'
            style={{
                border: '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow:
                'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                textShadow:
                '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
            }}
        >
            07:22
        </div>
    </div>
  )
}

export default Time