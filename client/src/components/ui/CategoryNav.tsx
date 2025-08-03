'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const categories = [
  { name: 'Graphics & Design' },
  { name: 'Programming & Tech' },
  { name: 'Digital Marketing' },
  { name: 'Video & Animation' },
  { name: 'Writing & Translation' },
  { name: 'Music & Audio' },
  { name: 'Business' },
  { name: 'Finance' },
  { name: 'AI' },
  { name: 'Content Writing' },
]

const SCROLL_AMOUNT = 150
const SCROLL_INTERVAL = 30 // ms
const SCROLL_STEP = 1 // px

const CategoryNav = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll effect with seamless loop
  useEffect(() => {
    let interval: NodeJS.Timeout
    const scrollContainer = containerRef.current

    if (scrollContainer) {
      interval = setInterval(() => {
        // If we've scrolled past the first set, reset to the start
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth / 2
        ) {
          scrollContainer.scrollLeft = 0
        } else {
          scrollContainer.scrollLeft += SCROLL_STEP
        }
      }, SCROLL_INTERVAL)
    }
    return () => clearInterval(interval)
  }, [])

  // Manual scroll
  const scrollLeft = () => {
    if (containerRef.current) {
      // If at the start, jump to the middle
      if (containerRef.current.scrollLeft === 0) {
        containerRef.current.scrollLeft = containerRef.current.scrollWidth / 2
      }
      containerRef.current.scrollLeft -= SCROLL_AMOUNT
    }
  }
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += SCROLL_AMOUNT
      // If we've scrolled past the first set, reset to the start
      if (
        containerRef.current.scrollLeft >=
        containerRef.current.scrollWidth / 2
      ) {
        containerRef.current.scrollLeft = 0
      }
    }
  }

  return (
    <motion.div
      className="w-full mx-auto pb-20 flex items-center"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 10 }}
      transition={{ duration: 0.6 }}
    >
      <button
        className="flex items-center text-white/60 mr-2 cursor-pointer p-2 hover:bg-white/10 rounded-full"
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
      </button>
      <div
        ref={containerRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap flex-1"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Duplicate categories for seamless loop */}
        {[...categories, ...categories].map((cat, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer text-sm"
          >
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
      <button
        className="flex items-center text-white/60 ml-2 cursor-pointer p-2 hover:bg-white/10 rounded-full"
        onClick={scrollRight}
        aria-label="Scroll right"
      >
      </button>
    </motion.div>
  )
}

export default CategoryNav