"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export default function ProductCard({
  product,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
  {/* Product Image */}
  <div className="relative w-full h-40 ">
    <Image
      src={
        product.image ||
        "https://placehold.co/600x400?text=No+Image"
      }
      alt={product.name}
      fill
      className="object-contain"
    />
  </div>

  {/* Product Details */}
  <div className="p-3">
    <h2 className="text-lg font-bold text-gray-800">
      {product.name}
    </h2>

    <p className="text-sm text-gray-500 mb-2">
      {product.category}
    </p>

    <div className="space-y-1 text-sm">
      <p>
        <strong>Price:</strong> ₹{product.price}/Kg
      </p>

      <p>
        <strong>Quantity:</strong> {product.quantity} Kg
      </p>

      <p>
        <strong>Location:</strong> {product.location}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`font-medium ${
            product.status === "available"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {product.status}
        </span>
      </p>

      <p>⭐ {product.averageRating} ({product.totalReviews})</p>
    </div>

    {/* Buttons */}
    <div className="flex gap-2 mt-3">
      <Link
        href={`/farmer/products/${product._id}/edit`}
        className="flex-1 bg-blue-600 text-white text-center py-1.5 rounded-md hover:bg-blue-700 text-sm"
      >
        Edit
      </Link>

      <button
        onClick={() => onDelete(product._id)}
        className="flex-1 bg-red-600 text-white py-1.5 rounded-md hover:bg-red-700 text-sm"
      >
        Delete
      </button>
    </div>
  </div>
</div>
  );
}