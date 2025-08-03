"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full mt-5 text-white backdrop-blur-sm bg-white/5 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-6">
        <h1 className="text-xl font-bold tracking-wide">GiqueX</h1>

        <p className="text-sm text-gray-300 mt-2">
          Empowering talent, one gig at a time.
        </p>
        <div className="text-sm text-gray-400">
          <Link href="/privacy">Privacy</Link> ·{" "}
          <Link href="/terms">Terms</Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4 text-xl">
            <a href="https://github.com" target="_blank">
              <FaGithub />
            </a>
            <a href="https://twitter.com" target="_blank">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-white/10">
        © {new Date().getFullYear()} GiqueX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
