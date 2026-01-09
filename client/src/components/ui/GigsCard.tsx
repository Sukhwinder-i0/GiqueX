'use client'

import { FaStar } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface Gig {
  _id: string;
  title: string;
  description: string;
  price: number;
  media?: string[];
  category?: string;
  tags?: string[];
  user?: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

interface GigsCardProps {
  gig: Gig;
}

const GigsCard = ({ gig }: GigsCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/gigs/${gig._id}`);
  };

  const firstMedia = gig.media && gig.media.length > 0 ? gig.media[0] : null;
  const sellerName = typeof gig.user === 'object' ? gig.user?.name : 'Seller';

  return (
    <div 
      onClick={handleClick}
      className="w-[250px] min-h-[320px] rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-2 flex flex-col shadow-md transition hover:shadow-xl hover:-translate-y-1 hover:bg-white/10 cursor-pointer"
    >
      <div className="relative w-full h-40 flex justify-center items-center text-white bg-slate-800 rounded-lg overflow-hidden">
        {firstMedia ? (
          <img 
            src={firstMedia} 
            alt={gig.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white/60 text-sm">No Image</span>
        )}
      </div>

      <div className="mt-3 px-1 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="font-medium text-white line-clamp-1">{gig.title}</span>
          {gig.category && (
            <span className="bg-green-700 text-xs text-white px-2 py-1 rounded-sm whitespace-nowrap">
              {gig.category}
            </span>
          )}
        </div>
        <p className="text-white/80 text-sm line-clamp-2 mt-2">
          {gig.description || 'No description'}
        </p>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="flex items-center gap-1 text-white font-medium">
            <FaStar className="text-yellow-400" /> 4.5
          </span>
          <span className="text-white font-semibold">₹{gig.price}</span>
        </div>
        {sellerName && (
          <p className="text-white/60 text-xs mt-1">by {sellerName}</p>
        )}
      </div>
    </div>
  )
}

export default GigsCard
