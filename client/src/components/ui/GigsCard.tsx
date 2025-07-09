'use client'

import { FaHeart, FaStar, FaPlay } from 'react-icons/fa'

const GigsCard = () => {
  return (
    <div className="w-[250px] min-h-[320px] rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-2 flex flex-col shadow-md transition hover:shadow-xl hover:-translate-y-1 hover:bg-white/10">
      
      <div className="relative w-full h-40 flex justify-center items-center text-white bg-slate-800 rounded-lg overflow-hidden">
        
        Images/videos
        
      </div>

      <div className="mt-3 px-1 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 text-sm">
          
          
          <span className="font-medium text-white">Name</span>
          <span className="bg-green-700 text-xs text-white px-4 py-1 rounded-sm">
            Top Rated
          </span>
        </div>
        <p className="text-white/80 text-sm line-clamp-1 mt-2">
          I will do blah blah blah...
        </p>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="flex items-center gap-1 text-white font-medium">
            <FaStar className="text-yellow-400" /> rating
          </span>
          <span className="text-white font-semibold">From ₹9,010</span>
        </div>
      </div>
    </div>
  )
}

export default GigsCard
