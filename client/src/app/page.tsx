import HeroSection from '@/components/Hero'
import Services from '@/components/Service-section'
import Stats from '@/components/Stats'
import CategoryNav from '@/components/ui/CategoryNav'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSection /> 
      <CategoryNav />
      <Stats />
      <Services />
    </div>
  )
}

export default page