"use client";

import Link from "next/link";
import { useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "./ui/Button";
import SearchBar from "./ui/SearchBar";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { HiMenu } from "react-icons/hi";

export default function Navbar() {
  const [isSignin ] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full fixed mx-auto px-4 md:px-10 py-1.5 flex justify-between items-center backdrop-blur-md bg-white/10 border-white/50 shadow-md rounded-md z-50">
        <Link href="/" className="text-xl font-bold text-white">
          GiqueX
        </Link>

        <div className="flex-1 flex justify-center">
          <SearchBar
            className="w-30 sm:w-60 md:w-90 px-2"
            placeholder="Search talent"
          />
        </div>

        <div className="flex items-center gap-3">
          {isSignin ? (
            <Button
              variant="primary"
              size="md"
              startIcon={<CgProfile />}
              className="font-bold rounded-full border"
            />
          ) : (
            <Button
              text="Sign In"
              variant="secondary"
              size="md"
              startIcon={<LogIn size={16} strokeWidth={2.5} />}
              className="font-bold"
            />
          )}

          <button
            className="md:hidden text-white text-3xl p-2 rounded focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
          >
            <HiMenu />
          </button>

          {/* Desktop only: rest of the buttons */}
          <div className="hidden md:flex gap-4 items-center">
            <IoMdNotifications className="font-bold text-2xl text-gray-200 cursor-pointer" />
            <IoChatboxEllipsesOutline className="font-bold text-2xl text-gray-300 cursor-pointer" />
            <Button variant="primary" text="Start Selling" size="sm" />
            <Link href="/" className="text-white font-medium">
              Home
            </Link>
            <Link href="/orders" className="text-white font-medium">
              Orders
            </Link>
            <Link href="/gigs" className="text-white font-medium">
              Gigs
            </Link>
          </div>
        </div>
      </div>

      {/* Hamburger Modal for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden">
          <div className="w-64 bg-white/10 backdrop-blur-md h-full p-6 flex flex-col gap-6 border-l border-white/20 shadow-xl">
            <button
              className="self-end text-white text-2xl mb-4"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            <IoMdNotifications className="font-bold text-2xl text-gray-200 cursor-pointer" />
            <IoChatboxEllipsesOutline className="font-bold text-2xl text-gray-300 cursor-pointer" />
            <Button
              variant="primary"
              text="Start Selling"
              size="sm"
              className="w-full"
            />
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-white font-medium"
            >
              Home
            </Link>
            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="text-white font-medium"
            >
              Orders
            </Link>
            <Link
              href="/gigs"
              onClick={() => setIsOpen(false)}
              className="text-white font-medium"
            >
              Gigs
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
