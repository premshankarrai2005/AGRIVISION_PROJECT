"use client";

import Image from "next/image";

import { Product } from "@/types/product";

import ProductInfo from "./ProductInfo";

import ProductActions from "./ProductActions";

interface Props {
  product: Product;
}

export default function ProductDetailsByer({
  product,
}: Props) {
  return (
    <div className="grid gap-10 lg:grid-cols-2">

      <div className="relative h-125 w-full">

        <Image
          src={
            product.image ||
            "https://placehold.co/600x600?text=No+Image"
          }
          alt={product.name}
          fill
          className="rounded-xl object-cover"
        />

      </div>

      <div>

        <ProductInfo product={product} />

        <ProductActions
          productId={product._id}
        />

      </div>

    </div>
  );
}