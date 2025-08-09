"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { LanguagesList } from "@/components/profile/LanguagesList";
import { ReviewsList } from "@/components/profile/ReviewsList";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";

export default function Page() {
  const { user, fetchUser, isLoading, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    await logout(); // clear store + API logout
    router.push("/auth"); // redirect to auth page
  };

  if (isLoading) return <p>Loading...</p>;
  if (!user) {
    router.push("/auth"); // auto-redirect if no user
    return null;
  }

  return (
    <div className="min-h-screen text-white py-20">
      <div className="max-w-5xl mx-auto px-4 flex gap-8">
        <div className="w-[50%]">
          <div className="border border-white/20 rounded-xl overflow-hidden">
            <ProfileHeader
              avatar={user.avatar}
              name={user.name}
              email={user.email}
            />

            <div className="p-8 pt-0">
              <Button
                text="Logout"
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleLogout}
              />
            </div>

            <div className="p-6 border-t border-white/10">
              <h3 className="text-lg font-semibold mb-4">Languages</h3>

              {user.languages && user.languages.length > 0 ? (
                <LanguagesList languages={user.languages} />
              ) : (
                <p className="text-center text-sm text-white/60">
                  Add languages for better results
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <ReviewsList reviews={user.reviews || []} />
        </div>
      </div>
    </div>
  );
}
