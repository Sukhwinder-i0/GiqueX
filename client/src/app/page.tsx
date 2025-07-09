import BackgroundLayout from '@/components/BackgroundLayout'
import HeroSection from '@/components/Hero'
import Navbar from '@/components/Navbar'
import CategoryNav from '@/components/ui/CategoryNav'
import PopularCategories from '@/components/ui/PopularCategories'
import React from 'react'

const page = () => {
  return (
    <BackgroundLayout>
    <div>
      <Navbar />
      <CategoryNav />
      <HeroSection />
    </div>
    </BackgroundLayout>
  )
}

export default page