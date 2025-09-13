"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { HiMenu } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Button } from "./ui/Button";
import SearchBar from "./ui/SearchBar";
import { BuyerNav } from "./nav/BuyerNav";
import { SellerNav } from "./nav/SellerNav";
import { UserMenu } from "./nav/UserMenu";
import { MobileMenu } from "./nav/MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, switchRole } = useAuthStore();

  const handleSwitchRole = async () => {
    await switchRole();
    if (user?.role === "buyer") router.push("/seller/dashboard");
  };

  return (
    <>
      <div className="w-full fixed mx-auto px-2 md:px-10 py-1.5 flex justify-between items-center backdrop-blur-md bg-white/10 border-white/50 shadow-md rounded-md z-50">
        <Link href="/" className="text-xl font-bold text-white">
          GiqueX
        </Link>

        {(user?.role === "buyer" || !user) && (
          <div className="flex-1 flex justify-center">
            <SearchBar
              className="w-30 sm:w-60 md:w-90 px-2"
              placeholder="Search talent"
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          {user?.role === "seller" ? <SellerNav /> : <BuyerNav />}

          <Button
            variant="primary"
            text={
              user?.role === "seller" ? "Switch to Buying" : "Start Selling"
            }
            size="sm"
            onClick={handleSwitchRole}
          />

          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button
              text="Sign In"
              variant="secondary"
              size="md"
              startIcon={<LogIn size={16} strokeWidth={2.5} />}
              className="font-bold"
              onClick={() => router.push("/auth")}
            />
          )}

          <button
            className="md:hidden text-white text-3xl p-2 rounded focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
          >
            <HiMenu />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={user}
        onSwitchRole={handleSwitchRole}
      />
    </>
  );
}
