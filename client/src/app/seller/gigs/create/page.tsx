"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/InputBox";
import toast from "react-hot-toast";

export default function CreateGigPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    price: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || user.role !== 'seller') {
      toast.error('You need to be a seller to create gigs');
      router.push('/auth');
      return;
    }

    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('tags', formData.tags);
      data.append('price', formData.price);

      files.forEach((file) => {
        data.append('media', file);
      });

      await api.post('/gigs/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Gig created successfully!');
      router.push('/seller/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create gig');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 5);
      setFiles(selectedFiles);
    }
  };

  const categories = ['Web Development', 'Graphic Design', 'Writing', 'Marketing', 'Video Editing', 'Music', 'Other'];

  return (
    <div className="min-h-screen text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Create New Gig</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <Input
              type="text"
              placeholder="e.g., I will design a modern website"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
              placeholder="Describe what you will do..."
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-800">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
            <Input
              type="text"
              placeholder="e.g., web design, responsive, modern"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (₹) *</label>
            <Input
              type="number"
              placeholder="e.g., 5000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Images (up to 5)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
            />
            {files.length > 0 && (
              <p className="text-sm text-white/60 mt-2">
                {files.length} file(s) selected
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              text={loading ? "Creating..." : "Create Gig"}
              variant="primary"
              disabled={loading}
              className="flex-1"
            />
            <Button
              type="button"
              text="Cancel"
              variant="secondary"
              onClick={() => router.push('/seller/gigs')}
              className="flex-1 text-black"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
