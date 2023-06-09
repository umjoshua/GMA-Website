import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Slider from '../../components/Slider/Slider'
import './Home.css'

function Home() {
  return (
    <div>
        <Navbar/>
        <div className='slider_div'>
        <Slider/>
        </div>
        
    </div>
  )
}

export default Home