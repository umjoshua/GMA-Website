import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Slider from '../../components/Slider/Slider'
import './Home.css'
import Footer from '../../components/Footer/Footer'

function Home() {
  return (
    <div>
        <Navbar/>
        <div className='slider_div'>
        <Slider/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home