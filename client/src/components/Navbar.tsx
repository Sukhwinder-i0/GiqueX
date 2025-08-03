'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Button } from './ui/Button';
import SearchBar from './ui/SearchBar';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { IoMdNotifications } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full fixed mx-auto px-10 py-1.5 flex justify-between items-center backdrop-blur-md bg-white/10 border-white/50 shadow-md rounded-md z-50">
      
        <Link href="/" className="text-xl font-bold text-white">
          GiqueX
        </Link>

        

        <nav className="hidden md:flex items-center justify-around gap-6 text-white text-sm font-medium w-[50%] ">

          
          <SearchBar className='w-90' placeholder='Search talent' />
          <Link href="/">Home</Link>
          <Link href="/orders">Orders</Link>
          {/* <Link href="/login" className="px-4 py-1 rounded-full border border-white/30 hover:bg-white/10 transition">
            Login
          </Link> */}
        </nav>

        <div className='flex gap-6 justify-center items-center'>

       <IoMdNotifications className='font-bold text-2xl text-gray-200 cursor-pointer' />

      <IoChatboxEllipsesOutline 
      className='font-bold text-2xl text-gray-300 cursor-pointer'/>

        <Button 
          variant='primary'
          text='Switch to Selling'
          size='sm'
        />

        <Button 
          text='Sign In'
          variant='secondary'
          size='md'
          startIcon={<LogIn size={16} strokeWidth={2.5} />}
          className='font-bold'
        />

        <Button 
        variant='primary'
          size='md'
          startIcon={<CgProfile />}
          className='font-bold rounded-full border'
        />


         </div>
        

      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 px-4 pb-4 pt-2 space-y-2 text-white">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/gigs" onClick={() => setIsOpen(false)}>Gigs</Link>
          <Link href="/orders" onClick={() => setIsOpen(false)}>Orders</Link>
          <Link href="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
          <Link href="/login" className="block px-4 py-2 mt-2 rounded-full border border-white/30 hover:bg-white/10 transition" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        </div>
      )}
    </>
  );
}
