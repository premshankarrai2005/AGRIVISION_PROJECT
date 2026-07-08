"use client";

import { Product } from "@/types/product";
import BuyerProductCard from "./BuyerProductCard";

interface Props {
  products: Product[];
}

export default function BuyerProductGrid({
  products,
}: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">

        <h2 className="text-2xl font-bold">
          No Products Found
        </h2>

      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {products.map((product) => (
        <BuyerProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>
  );
}