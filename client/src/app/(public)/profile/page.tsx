'use client'

import { FaStar, FaEdit, FaEnvelope, FaBriefcase } from 'react-icons/fa'
import React from 'react'

export default function SellerProfilePage() {
  return (
    <div className="w-full min-h-screen text-white flex justify-center py-16 px-4">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg flex flex-col items-center gap-6">
        
        <div className="relative">
          <div className="w-40 h-40 rounded-full border-4 border-white/20 overflow-hidden">

          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Sukhwinder Singh</h2>
          <p className="text-white/60 text-sm">@sukh.dev</p>
        </div>

        <p className="text-center text-white/70 max-w-xl">
          Full Stack Developer & Problem Solver | Crafting beautiful web apps using React, Node.js, and Web3.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" /> 4.9 rating
          </div>
          <div className="flex items-center gap-2">
            <FaBriefcase /> 12 Projects Completed
          </div>
          <div className="flex items-center gap-2">
            Joined: Jan 2024
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {['Next.js', 'Node.js', 'MongoDB', 'Solana', 'TypeScript', 'Tailwind'].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-white"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm">
            <FaEnvelope /> Message
          </button>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
            <FaBriefcase /> Hire Me
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-md text-sm">
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}
