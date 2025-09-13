import Link from "next/link"

export function SellerNav() {
  return (
    <div className="hidden md:flex gap-4 items-center">
      <Link href="/seller/dashboard" className="text-white font-medium">
        Dashboard
      </Link>
      <Link href="/seller/gigs" className="text-white font-medium">
        My Gigs
      </Link>
    </div>
  )
}