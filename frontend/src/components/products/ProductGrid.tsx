"use client";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductGrid({
  products,
  onDelete,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">

        <h2 className="text-2xl font-bold text-gray-500">
          No Products Found
        </h2>

        <p className="mt-2 text-gray-400">
          Add your first product.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}