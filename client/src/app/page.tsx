import HeroSection from '@/components/Hero'
import Stats from '@/components/Stats'
import CategoryNav from '@/components/ui/CategoryNav'
import GigsCard from '@/components/ui/GigsCard'
import React from 'react'

const page = () => {
  return (
    <div>
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
  )
}

export default page