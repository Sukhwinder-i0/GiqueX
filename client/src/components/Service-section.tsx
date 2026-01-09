"use client";

import React, { useEffect, useState } from "react";
import GigsCard from "./ui/GigsCard";
import { api } from "@/lib/api";

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

const Services = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGigs() {
      try {
        const res = await api.get('/gigs/browse?limit=4');
        setGigs(res.data?.data?.gigs || res.data?.gigs || []);
      } catch (err) {
        console.error('Failed to fetch gigs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGigs();
  }, []);

  return (
    <div className="w-full mb-30">
      <div className=" flex justify-center items-center gap-2 text-purple-200 text-center px-10 mb-20 text-3xl font-extrabold ">
        <div
          className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-md text-white text-xl font-extrabold inline-block shadow-lg border border-white/20 transition-transform duration-300 ease-in-out"
          style={{
            transform: "rotate(-8deg)",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "rotate(0deg)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "rotate(-8deg)")
          }
        >
          <p
            className="border-b-4 border-gradient-to-r from-amber-400 via-pink-500 to-purple-500 transition-all duration-300 pb-1"
            style={{
              borderImage:
                "linear-gradient(to right, #fbbf24, #ec4899, #8b5cf6) 1",
              borderBottomWidth: "2px",
            }}
          >
            SERVICES
          </p>
        </div>
        <p className="text-purple-200 "> You may looking for ?</p>
      </div>
      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-white">Loading gigs...</p>
        </div>
      ) : gigs.length > 0 ? (
        <div className="w-full flex flex-col gap-8 md:flex-row justify-around items-center">
          {gigs.map((gig) => (
            <GigsCard key={gig._id} gig={gig} />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-white/60">No gigs available yet</p>
        </div>
      )}
    </div>
  );
};

export default Services;
