"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { Product } from "@/types/product";

import WishlistGrid from "@/components/wishlist/WishlistGrid";

import {
  getWishlist,
  toggleWishlist,
} from "@/services/wishlistService";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      const data = await getWishlist();

      setWishlist(data.wishlist);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load wishlist"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (
    productId: string
  ) => {
    try {
      await toggleWishlist(productId);

      toast.success("Removed");

      loadWishlist();
    } catch {
      toast.error("Failed");
    }
  };

  if (loading)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl p-8">

      <h1 className="mb-8 text-4xl font-bold">
        ❤️ My Wishlist
      </h1>

      <WishlistGrid
        wishlist={wishlist}
        onRemove={handleRemove}
      />

    </div>
  );
}