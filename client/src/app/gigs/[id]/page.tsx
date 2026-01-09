"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

interface Gig {
  _id: string;
  title: string;
  description: string;
  price: number;
  media?: string[];
  category?: string;
  tags?: string[];
  user?: {
    _id: string;
    name: string;
    avatar?: string;
    email?: string;
  };
}

interface Review {
  _id: string;
  rating: number;
  comment?: string;
  buyer: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const [gig, setGig] = useState<Gig | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchGig();
      fetchReviews();
    }
  }, [params.id]);

  const fetchGig = async () => {
    try {
      const res = await api.get(`/gigs/${params.id}`);
      setGig(res.data?.data || res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to load gig');
      router.push('/gigs');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/${params.id}`);
      setReviews(res.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const handleOrder = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to place an order');
      router.push('/auth');
      return;
    }

    setOrdering(true);
    try {
      const res = await api.post('/user/orders/create', { gigId: params.id });
      toast.success('Order placed successfully!');
      router.push('/orders');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <p>Gig not found</p>
      </div>
    );
  }

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Button
          text="← Back to Browse"
          variant="secondary"
          onClick={() => router.push('/gigs')}
          className="mb-6"
        />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Media */}
          <div className="space-y-4">
            {gig.media && gig.media.length > 0 ? (
              <div className="space-y-2">
                <img
                  src={gig.media[0]}
                  alt={gig.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {gig.media.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {gig.media.slice(1, 5).map((media, idx) => (
                      <img
                        key={idx}
                        src={media}
                        alt={`${gig.title} ${idx + 2}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-96 bg-slate-800 rounded-lg flex items-center justify-center">
                <p className="text-white/60">No images available</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{gig.title}</h1>
              {gig.category && (
                <span className="bg-green-700 text-sm text-white px-3 py-1 rounded">
                  {gig.category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold">{avgRating.toFixed(1)}</span>
                <span className="text-white/60">({reviews.length} reviews)</span>
              </div>
              {gig.user && (
                <span className="text-white/80">by {gig.user.name}</span>
              )}
            </div>

            <div>
              <p className="text-3xl font-bold text-purple-400">₹{gig.price}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-white/80 whitespace-pre-wrap">{gig.description}</p>
            </div>

            {gig.tags && gig.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {gig.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 px-3 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button
              text={ordering ? "Placing Order..." : "Place Order"}
              variant="primary"
              onClick={handleOrder}
              disabled={ordering || (user?.role === 'seller' && gig.user?._id === user?._id)}
              className="w-full"
            />
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Reviews ({reviews.length})</h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white/5 p-6 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.rating ? "text-yellow-400" : "text-white/30"}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{review.buyer.name}</span>
                    <span className="text-white/60 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-white/80">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60">No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
