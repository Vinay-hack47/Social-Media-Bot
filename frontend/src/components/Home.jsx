import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import CTASection from './CTASection'
import Footer from './Footer'


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Home
