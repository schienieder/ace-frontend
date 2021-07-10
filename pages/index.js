import Nav from '../components/hero/Nav'
import Hero from '../components/hero/Hero'
import About from '../components/hero/About'
import Testimonials from '../components/hero/Testimonials'
import Awards from '../components/hero/Awards'
import Rate from '../components/hero/Rate'
import Footer from '../components/Footer'
import ScrollTopBtn from '../components/hero/ScrollTopBtn'

export default function hero() {
  return (
    <>
    <Nav />
    <div className="min-h-screen w-full grid grid-rows-hero">
      <Hero />
      <About />
      <Testimonials />
      <Awards />
      <Rate />
      <Footer />
      <ScrollTopBtn />
    </div>
    </>
  )
}