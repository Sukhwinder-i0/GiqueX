'use client'

import HeroSection from '@/components/Hero'
import Services from '@/components/Service-section'
import Stats from '@/components/Stats'
import CategoryNav from '@/components/ui/CategoryNav'
import { useAuthStore } from '@/store/authStore'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const page = () => {


  const params = useSearchParams();

   useEffect(() => {
    if (params?.get('login') === 'success') {
      toast.success('Login successful via Google');
    }
    useAuthStore.getState().fetchUser();
  }, [params]);


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