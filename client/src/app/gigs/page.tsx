"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GigsCard from "@/components/ui/GigsCard";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/InputBox";

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
  };
}

export default function BrowseGigsPage() {
  const searchParams = useSearchParams();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchGigs();
  }, [page, category]);

  const fetchGigs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      params.append('page', page.toString());
      params.append('limit', '12');

      const res = await api.get(`/gigs/browse?${params.toString()}`);
      const data = res.data?.data || res.data;
      setGigs(data?.gigs || []);
      setTotal(data?.total || 0);
      setHasMore((data?.gigs?.length || 0) < (data?.total || 0));
    } catch (err) {
      console.error('Failed to fetch gigs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchGigs();
  };

  const categories = ['Web Development', 'Graphic Design', 'Writing', 'Marketing', 'Video Editing', 'Music', 'Other'];

  return (
    <div className="min-h-screen text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Browse Gigs</h1>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search gigs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              text="Search"
              variant="primary"
              onClick={handleSearch}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              text="All"
              variant={category === '' ? 'primary' : 'secondary'}
              onClick={() => {
                setCategory('');
                setPage(1);
              }}
            />
            {categories.map((cat) => (
              <Button
                key={cat}
                text={cat}
                variant={category === cat ? 'primary' : 'secondary'}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
              />
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-20">
            <p>Loading gigs...</p>
          </div>
        ) : gigs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {gigs.map((gig) => (
                <GigsCard key={gig._id} gig={gig} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4">
              <Button
                text="Previous"
                variant="secondary"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              />
              <span className="flex items-center">
                Page {page} of {Math.ceil(total / 12)}
              </span>
              <Button
                text="Next"
                variant="secondary"
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasMore}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/60">No gigs found. Try different search terms or categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}
