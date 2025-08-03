'use client'

import { useEffect, useState } from 'react'
import { FaUsers, FaBriefcase, FaGlobeAsia } from 'react-icons/fa'

const stats = [
  { icon: <FaUsers />, label: 'Freelancers', value: 10000 },
  { icon: <FaBriefcase />, label: 'Gigs Completed', value: 5000 },
  { icon: <FaGlobeAsia />, label: 'Countries Served', value: 20 },
]

const Stats = () => {
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const duration = 2000 // in ms
    const steps = 60
    const interval = duration / steps

    const timers = stats.map((stat, index) => {
      const increment = stat.value / steps
      let current = 0
      return setInterval(() => {
        current += increment
        setCounts((prev) => {
          const updated = [...prev]
          updated[index] = Math.min(Math.floor(current), stat.value)
          return updated
        })
      }, interval)
    })

    return () => timers.forEach(clearInterval)
  }, [])

  return (
    <section className="w-full py-4 mb-20 px-6 flex flex-col items-center justify-center ">
      <div className="md:grid grid grid-col grid-cols-1 md:grid-cols-3 gap-10 md:gap-30 text-white max-w-4xl w-full text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex rounded-2xl p-8 flex-col items-center gap-2 bg-white/5 backdrop-blur-md border-b-4 border-white/10">
            <div className="text-3xl text-indigo-400">{stat.icon}</div>
            <div className="text-2xl font-bold">
              {stat.label === 'Countries Served'
                ? `🌍 ${counts[i]}+`
                : `${counts[i].toLocaleString()}+`}
            </div>
            <p className="text-sm text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
