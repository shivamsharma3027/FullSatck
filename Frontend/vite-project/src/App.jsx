import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import Home from './components/Home.jsx'
import  DishesList  from './components/DishesList.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/All" element={<DishesList/>}/>
    </Routes>
     
   
    </BrowserRouter>
    </>
  )
}

export default App
