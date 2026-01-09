'use client'

import HeroSection from '@/components/Hero'
import Services from '@/components/Service-section'
import Stats from '@/components/Stats'
import CategoryNav from '@/components/ui/CategoryNav'
import { useAuthStore } from '@/store/authStore'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, Suspense } from 'react'
import toast from 'react-hot-toast'

function PageContent() {
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

const Page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen text-white flex items-center justify-center">Loading...</div>}>
      <PageContent />
    </Suspense>
  )
}

export default Page