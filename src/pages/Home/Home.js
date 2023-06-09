import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Slider from '../../components/Slider/Slider'
import './Home.css'
import Footer from '../../components/Footer/Footer'
import Contact from '../../components/Contact/Contact'

function Home() {
  return (
    <div>
        <Navbar/>
        <div className='slider_div'>
        <Slider/>
        </div>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Home