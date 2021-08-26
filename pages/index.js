import Nav from '../components/hero/Nav'
import Hero from '../components/hero/Hero'
import Awards from '../components/hero/Awards'
import About from '../components/hero/About'
import Services from '../components/hero/Services'
import Testimonials from '../components/hero/Testimonials'
import Rate from '../components/hero/Rate'
import Footer from '../components/hero/Footer'

export default function hero() {
  return (
    <>
    <Nav />
    <div className="min-h-screen w-full bg-white grid grid-rows-hero">
      <Hero />
      <Awards />
      <About />
      <Services />
      <Testimonials />
      <Rate />
      <Footer />
    </div>
    </>
  )
}