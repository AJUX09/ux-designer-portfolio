import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Process from '@/components/Process'
import Tools from '@/components/Tools'
import Projects from '@/components/Projects'
import AppMarket from '@/components/AppMarket'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ClientEffects from '@/components/ClientEffects'
import TubesCursor from '@/components/ui/tubes-cursor'

export default function Home() {
  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-follower" id="cursor-follower"></div>
      <div className="noise"></div>

      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Process />
      <Tools />
      <Projects />
      <AppMarket />
      <Contact />
      <Footer />

      <TubesCursor />
      <ClientEffects />
    </>
  )
}
