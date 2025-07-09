import BackgroundLayout from '@/components/BackgroundLayout'
import HeroSection from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Stats from '@/components/Stats'
import CategoryNav from '@/components/ui/CategoryNav'
import GigsCard from '@/components/ui/GigsCard'
import React from 'react'

const page = () => {
  return (
    <BackgroundLayout>
    <div>
      <Navbar />
      <CategoryNav />
      <HeroSection />
      <Stats />
      <div className='w-full flex justify-around items-center'>
      <GigsCard />
      <GigsCard />
      <GigsCard />
      <GigsCard />
      </div>
    </div>
    </BackgroundLayout>
  )
}

export default page