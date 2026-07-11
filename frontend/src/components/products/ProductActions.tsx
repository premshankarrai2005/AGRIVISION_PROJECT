"use client";

import toast from "react-hot-toast";

import { toggleWishlist } from "@/services/wishlistService";
import { addToCart } from "@/services/cartService";

interface Props {
  productId: string;
}

export default function ProductActions({ productId }: Props) {
  const handleWishlist = async () => {
    try {
      await toggleWishlist(productId);

      toast.success("Wishlist Updated");
    } catch {
      toast.error("Failed");
    }
  };

  const handleBuyNow = () => {
    toast.success("Order module coming soon.");
  };

  const handleCart = async () => {
    try {
      await addToCart(productId);

      toast.success("Added to Cart");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="mt-8 flex gap-4">
      <button
        onClick={handleWishlist}
        className="rounded-lg bg-pink-600 px-6 py-3 text-white hover:bg-pink-700"
      >
        ❤️ Wishlist
      </button>

      <button
        onClick={handleCart}
        className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}
