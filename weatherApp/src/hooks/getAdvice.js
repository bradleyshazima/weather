import {
  Rain, Rain2, Rain3,
  Snow, SnowCloud, SnowRain,
  Sun, SunCloud, SunRain,
  Thunder, ThunderRain
} from '../assets/icons'

export const getAdviceFromIcon = (icon) => {
  const map = {
    [Sun]: 'Shine bright like the sun ☀️',
    [SunCloud]: 'Play hide and seek with clouds!',
    [SunRain]: 'Sun + rain = rainbow time!',
    [Rain]: 'Grab your umbrella and jump in puddles!',
    [Rain2]: 'Rainy fun! Time for a splash battle!',
    [Rain3]: 'Tiny drops, big adventure!',
    [Thunder]: 'Be a lightning ninja ⚡️',
    [ThunderRain]: 'Stormy skies? Time for indoor games!',
    [Snow]: 'Make a snow angel and giggle!',
    [SnowCloud]: 'It’s snowing! Grab your mittens!',
    [SnowRain]: 'Rain or snow — it’s magic outside!',
  }

  return map[icon] || 'Be awesome, no matter the weather!'
}
