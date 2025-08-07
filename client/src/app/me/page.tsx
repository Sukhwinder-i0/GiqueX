"use client";

import { useState } from "react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { LanguagesList } from "@/components/profile/LanguagesList";
import { ReviewsList } from "@/components/profile/ReviewsList";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  location: string;
  joinedDate: string;
  languages: Array<{
    name: string;
    level: "Native/Bilingual" | "Fluent" | "Conversational";
  }>;
  reviews: Array<{
    from: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

const mockProfile: UserProfile = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/default-avatar.png",
  location: "Located in India",
  joinedDate: "Joined in October 2022",
  languages: [
    { name: "English", level: "Conversational" },
    { name: "Hindi", level: "Native/Bilingual" },
    { name: "Punjabi", level: "Fluent" }
  ],
  reviews: [
    {
      from: "DevSanya",
      rating: 5,
      comment: "Great client to work with! Clear communication and prompt payment.",
      date: "July 2023"
    }
  ]
}

export default function Page() {
  const [profile] = useState<UserProfile>(mockProfile);

  return (
    <div className="min-h-screen text-white py-20">
      <div className="max-w-5xl mx-auto px-4 flex gap-8">
        {/* Left Column */}
        <div className="w-[50%] ">
          <div className="border border-white/20 rounded-xl overflow-hidden">
            <ProfileHeader
              avatar={profile.avatar}
              name={profile.name}
              email={profile.email}
              location={profile.location}
              joinedDate={profile.joinedDate}
            />
            <LanguagesList languages={profile.languages} />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <ReviewsList reviews={profile.reviews} />
        </div>
      </div>
    </div>
  );
}
