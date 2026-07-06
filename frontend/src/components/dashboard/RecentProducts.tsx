"use client";

import Link from "next/link";
import { Product } from "@/types/product";

interface RecentProductsProps {
  products: Product[];
}

export default function RecentProducts({
  products,
}: RecentProductsProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between mb-5">

        <h2 className="text-xl font-bold">
          Recent Products
        </h2>

        <Link
          href="/farmer/products"
          className="text-green-600"
        >
          View All
        </Link>

      </div>

      {products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        <div className="space-y-4">

          {products.slice(0, 5).map((product) => (
            <div
              key={product._id}
              className="flex justify-between border-b pb-2"
            >
              <div>

                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.category}
                </p>

              </div>

              <span className="font-bold">
                ₹{product.price}
              </span>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}