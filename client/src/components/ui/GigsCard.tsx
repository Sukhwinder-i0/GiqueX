'use client'

import { FaHeart, FaStar, FaPlay } from 'react-icons/fa'

const GigsCard = () => {
  return (
    <div className="w-[250px] min-h-[320px] rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-2 flex flex-col shadow-md transition hover:shadow-xl hover:-translate-y-1 hover:bg-white/10">
      
      {/* Thumbnail */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        <img
          src="https://via.placeholder.com/250x160?text=Thumbnail"
          alt="Gig thumbnail"
          className="w-full h-full object-cover"
        />
        {/* Play Button */}
        <div className="absolute left-2 bottom-2 bg-black/60 p-1.5 rounded-full text-white text-xs">
          <FaPlay />
        </div>
        {/* Heart Icon */}
        <div className="absolute top-2 right-2 text-white/80 hover:text-pink-400 cursor-pointer">
          <FaHeart />
        </div>
      </div>

      {/* Gig Info */}
      <div className="mt-3 px-1 flex flex-col gap-1">
        {/* Seller + Badge */}
        <div className="flex items-center gap-2 text-sm">
          <img
            src="https://i.pravatar.cc/30"
            alt="Seller"
            className="w-6 h-6 rounded-full"
          />
          <span className="font-medium text-white">Yosh</span>
          <span className="bg-yellow-700 text-xs text-white px-2 py-0.5 rounded-md">
            Top Rated ♦♦♦
          </span>
        </div>
        <p className="text-white/80 text-sm line-clamp-1">
          I will build a desktop application with modern style...
        </p>

        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="flex items-center gap-1 text-white font-medium">
            <FaStar className="text-yellow-400" /> 5.0 <span className="text-white/50">(40)</span>
          </span>
          <span className="text-white font-semibold">From ₹9,010</span>
        </div>
      </div>
    </div>
  )
}

export default GigsCard
