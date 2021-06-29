import Nav from '../components/hero/Nav'
import Hero from '../components/hero/Hero'
import About from '../components/hero/About'
import Services from '../components/hero/Services'
import Awards from '../components/hero/Awards'
import Contact from '../components/hero/Contact'
import Footer from '../components/Footer'
import ScrollTopBtn from '../components/hero/ScrollTopBtn'

export default function hero() {
  return (
    <>
    <Nav />
    <div className="min-h-screen w-full grid grid-rows-hero">
      <Hero />
      <About />
      <Services />
      <Awards />
      <Contact />
      <Footer />
      <ScrollTopBtn />
    </div>
    </>
  )
}