'use client'

import { useRef } from 'react'
import { FaFire, FaChevronRight } from 'react-icons/fa'

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

const CategoryNav = ()  => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center bg-white/5 backdrop-blur-md  border-white/10 sticky top-0 z-30 shadow-sm rounded">
      <div
        ref={containerRef}
        className="flex items-center gap-2 whitespace-nowra"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer text-sm"
          >
            {cat.icon && <span className="text-base">{cat.icon}</span>}
            <span>{cat.name}</span>
          </div>
        ))}
        <div className="flex items-center text-white/60 ml-auto cursor-pointer">
          <FaChevronRight />
        </div>
      </div>
    </div>
  )
}

export default CategoryNav
