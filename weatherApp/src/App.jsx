import { useState } from 'react'
import './App.css'
import { Card } from './components'

function App() {
  const bgImage = "https://res.cloudinary.com/bradley-cdn/image/upload/f_auto,q_auto/v1752001468/newyork_scnwns.jpg"

  return (
    <main
      className="w-full h-screen bg-cover bg-top flex"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Card />
    </main>
  )
}

export default App
