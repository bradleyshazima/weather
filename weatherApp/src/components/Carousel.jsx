import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { CITY_DATA } from '../constants/cities'

const Carousel = ({ onSelectCity }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = () => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    setSelectedIndex(index)
    if (onSelectCity) onSelectCity(CITY_DATA[index].code)
  }

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi])

  const scrollTo = (index) => {
    if (!emblaApi) return
    emblaApi.scrollTo(index)
  }

  return (
    <div
      className="h-fit overflow-hidden w-[400px] absolute bottom-8 lg:bottom-12 2xl:bottom-16 2xl:scale-100 scale-80 lg:scale-90 left-1/2 transform -translate-x-1/2"
      ref={emblaRef}
    >
      <div className="flex gap-4 px-6 h-[70px]">
        {CITY_DATA.map((city, index) => (
          <div
            className="w-16 shrink-0 flex justify-center items-center cursor-pointer"
            key={city.code}
            onClick={() => scrollTo(index)}
          >
            <div
              className={`w-16 h-16 rounded-lg flex items-center justify-center text-white bg-white/10 backdrop-blur-[20px] font-bold text-lg sf transition-transform duration-300 ${
                index === selectedIndex ? 'scale-100' : 'scale-90'
              }`}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow:
                  'inset 5px 5px 5px rgba(255,255,255,0.1), inset -5px -5px 250px rgba(255,255,255,0.05), rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                textShadow:
                  '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
              }}
            >
              {city.code}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
