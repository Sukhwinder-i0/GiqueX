import { IoChatboxEllipsesOutline } from "react-icons/io5"
import { IoMdNotifications } from "react-icons/io"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { User } from "@/types"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSwitchRole: () => Promise<void>
}

export function MobileMenu({ isOpen, onClose, user, onSwitchRole }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed w-full inset-0 z-50 bg-black/40 flex justify-end md:hidden">
      <div className="w-64 bg-white/10 backdrop-blur-md h-full p-6 flex flex-col gap-6 border-l border-white/20 shadow-xl">
        <button
          className="self-end text-white text-2xl mb-4"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
        
        {user?.role === "seller" && (
          <>
            <Link href="/seller/dashboard" onClick={onClose} className="text-white font-medium">
              Dashboard
            </Link>
            <Link href="/seller/gigs" onClick={onClose} className="text-white font-medium">
              My Gigs
            </Link>
          </>
        )}

        {user?.role === "buyer" && (
          <Button
            variant="primary"
            text="Start Selling"
            size="sm"
            className="w-full"
            onClick={async () => {
              await onSwitchRole()
              onClose()
            }}
          />
        )}

        <Link href="/" onClick={onClose} className="text-white font-medium">
          Home
        </Link>
        <Link href="/orders" onClick={onClose} className="text-white font-medium">
          Orders
        </Link>
        
        <div className="flex gap-4">
          <IoMdNotifications className="text-2xl text-gray-200 cursor-pointer" />
          <IoChatboxEllipsesOutline className="text-2xl text-gray-300 cursor-pointer" />
        </div>
      </div>
    </div>
  )
}