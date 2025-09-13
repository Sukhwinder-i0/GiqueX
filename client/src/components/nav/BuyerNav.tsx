import Link from "next/link"
import { IoChatboxEllipsesOutline } from "react-icons/io5"

export function BuyerNav() {
  return (
    <div className="hidden md:flex gap-4 items-center">
      <IoChatboxEllipsesOutline className="font-bold text-2xl text-gray-300 cursor-pointer" />
      <Link href="/" className="text-white font-medium">
        Home
      </Link>
      <Link href="/orders" className="text-white font-medium">
        Orders
      </Link>
    </div>
  )
}