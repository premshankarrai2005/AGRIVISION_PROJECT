"use client";

import { Product } from "@/types/product";

import WishlistCard from "./WishlistCard";

interface Props {
  wishlist: Product[];

  onRemove: (id: string) => void;
}

export default function WishlistGrid({
  wishlist,
  onRemove,
}: Props) {
  if (wishlist.length === 0) {
    return (
      <div className="py-20 text-center">

        <h2 className="text-3xl font-bold">
          Wishlist is Empty
        </h2>

      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {wishlist.map((product) => (
        <WishlistCard
          key={product._id}
          product={product}
          onRemove={onRemove}
        />
      ))}

    </div>
  );
}