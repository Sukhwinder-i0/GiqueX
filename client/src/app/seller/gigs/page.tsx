"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Gig {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  media?: string[];
  createdAt: string;
}

export default function Gigs() {
  const router = useRouter();
  const { user, fetchUser, isLoggedIn } = useAuthStore();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      fetchUser();
    }
    if (user && user.role !== 'seller') {
      toast.error('You need to be a seller to access this page');
      router.push('/');
      return;
    }
    fetchGigs();
  }, [user, isLoggedIn]);

  const fetchGigs = async () => {
    try {
      const res = await api.get('/gigs/get');
      setGigs(res.data?.data || res.data || []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Please login first');
        router.push('/auth');
      } else {
        toast.error('Failed to fetch gigs');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (gigId: string) => {
    if (!confirm('Are you sure you want to delete this gig?')) return;

    setDeleting(gigId);
    try {
      await api.delete(`/gigs/delete/${gigId}`);
      toast.success('Gig deleted successfully');
      setGigs(gigs.filter((g) => g._id !== gigId));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete gig');
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (gigId: string) => {
    router.push(`/seller/gigs/edit/${gigId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Gigs</h1>
          <Button
            text={
              <>
                <FaPlus className="mr-2" />
                Create New Gig
              </>
            }
            variant="primary"
            onClick={() => router.push('/seller/gigs/create')}
          />
        </div>

        {gigs.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/60 mb-4">You haven't created any gigs yet</p>
            <Button
              text="Create Your First Gig"
              variant="primary"
              onClick={() => router.push('/seller/gigs/create')}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-white/5 rounded-lg border border-white/10 p-6 hover:bg-white/10 transition"
              >
                {gig.media && gig.media.length > 0 ? (
                  <img
                    src={gig.media[0]}
                    alt={gig.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-white/60">No Image</p>
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-2 line-clamp-1">{gig.title}</h3>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">{gig.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-400 font-bold">₹{gig.price}</span>
                  <span className="bg-green-700 text-xs text-white px-2 py-1 rounded">
                    {gig.category}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    text={<><FaEdit className="mr-1" /> Edit</>}
                    variant="secondary"
                    onClick={() => handleEdit(gig._id)}
                    className="flex-1"
                  />
                  <Button
                    text={<><FaTrash className="mr-1" /> Delete</>}
                    variant="secondary"
                    onClick={() => handleDelete(gig._id)}
                    disabled={deleting === gig._id}
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
