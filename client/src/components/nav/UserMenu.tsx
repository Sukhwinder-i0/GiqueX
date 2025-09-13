import Image from "next/image"
import { CgProfile } from "react-icons/cg"
import { useRouter } from "next/navigation"
import { User } from "@/types"

interface UserMenuProps {
  user: User | null
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()

  if (!user) return null

  return (
    <div
      className="relative w-8 h-8 cursor-pointer"
      onClick={() => router.push("/me")}
      aria-label="Profile"
    >
      {user.avatar ? (
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          className="rounded-full object-cover border-1 border-white/30"
        />
      ) : (
        <CgProfile
          size={24}
          className="text-white font-bold p-2 rounded-md bg-white/20 cursor-pointer hover:bg-white/30 transition-colors"
        />
      )}
    </div>
  )
}