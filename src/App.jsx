import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Main from './Components/Main'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Main/>
    </>
  )
}

export default App
