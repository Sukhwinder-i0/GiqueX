import Image from "next/image"

interface ProfileHeaderProps {
  avatar: string
  name: string
  email: string
}

export function ProfileHeader({ avatar, name, email }: ProfileHeaderProps) {
  return (
    <div className="backdrop-blur-md rounded-t-xl py-8">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={avatar}
            alt={name}  
            fill
            className="rounded-full object-cover border-2 border-purple-500/30"
          />
        </div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-400 mt-2">{email}</p>
        {/* <div className="mt-8 border-t border-white/20 px-6 pt-6 flex flex-col items-start space-y-2 w-full">
          <p className="text-sm text-gray-300">{location}</p>
          <p className="text-sm text-gray-300">{joinedDate}</p>
        </div> */}
      </div>
    </div>
  )
}