import BackgroundLayout from '@/components/BackgroundLayout'
import HeroSection from '@/components/Hero'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <BackgroundLayout>
    <div>
      <Navbar />
      <HeroSection />
    </div>
    </BackgroundLayout>
  )
}

export default page