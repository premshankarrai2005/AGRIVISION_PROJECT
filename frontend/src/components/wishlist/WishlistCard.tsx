"use client";

import Image from "next/image";

import { Product } from "@/types/product";

interface Props {
  product: Product;

  onRemove: (id: string) => void;
}

export default function WishlistCard({
  product,
  onRemove,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <div className="relative h-52 w-full">    

        <Image
          src={
            product.image ||
            ""
          }         
          alt={product.name}
          fill
          className="object-cover"
        /> 

      </div>

      <div className="space-y-2 p-4">

        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p>{product.category}</p>

        <p>₹{product.price}/Kg</p>

        <p>{product.location}</p>

        <button
          onClick={() => onRemove(product._id)}
          className="mt-3 w-full rounded-lg bg-red-600 py-2 text-white"
        >
          Remove
        </button>

      </div>
    </div>
  );
}