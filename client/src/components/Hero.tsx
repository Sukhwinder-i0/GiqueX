'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 relative">
     
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-gray-300 tracking-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Discover Skills. Hire Talent.
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        A marketplace for top freelance services. Find or offer skills. Build your dream team.
      </motion.p>

      <motion.div
        className="mt-10 flex gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Button variant='secondary' size="md" text='Get Started' className=' text-nowrap' />
        <Button variant="google" size="md" className='text-white'
          text='Explore Marketplace'
        />
      </motion.div>
    </section>
  );
}
