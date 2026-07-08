"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

interface BuyerProductCardProps {
  product: Product;
}

export default function BuyerProductCard({
  product,
}: BuyerProductCardProps) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <div className="relative h-52 w-full">
        <Image
          src={
            product.image ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">

        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-500">
          {product.category}
        </p>

        <div className="mt-3 space-y-1">

          <p>
            <strong>Price :</strong> ₹{product.price}/Kg
          </p>

          <p>
            <strong>Available :</strong> {product.quantity} Kg
          </p>

          <p>
            <strong>Location :</strong> {product.location}
          </p>

          <p>
            ⭐ {product.averageRating} ({product.totalReviews})
          </p>

        </div>

      </div>
    </Link>
  );
}