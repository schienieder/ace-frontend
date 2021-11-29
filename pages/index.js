import React, { useState } from 'react'
import Nav from '../components/hero/Nav'
import Hero from '../components/hero/Hero'
import Awards from '../components/hero/Awards'
import About from '../components/hero/About'
import Services from '../components/hero/Services'
import Testimonials from '../components/hero/Testimonials'
import Rate from '../components/hero/Rate'
import Footer from '../components/hero/Footer'
import MobileNav from '../components/hero/MobileNav'

export default function hero() {

  const [isShowing, setIsShowing] = useState(false)
  const showMobileNav = () => {
    setIsShowing(!isShowing)
  }


  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {
        isShowing && <MobileNav onClick={ showMobileNav } />
      }
      <Nav onClick={ showMobileNav } />
      <Hero />
      <Awards />
      <About />
      <Services />
      <Testimonials />
      <Rate />
      <Footer />
    </div>
  )
}