"use client";

import Link from "next/link";

export default function BuyerDashboard() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          🛒 Welcome
        </h1>

        <p className="text-gray-500">
          Buyer Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Link
          href="/products"
          className="rounded-xl bg-green-100 p-6 shadow"
        >
          <h2 className="text-xl font-bold">
            Browse Products
          </h2>

          <p className="mt-2 text-gray-600">
            Fresh products from farmers
          </p>
        </Link>

        <Link
          href="/wishlist"
          className="rounded-xl bg-pink-100 p-6 shadow"
        >
          <h2 className="text-xl font-bold">
            Wishlist
          </h2>

          <p className="mt-2 text-gray-600">
            Saved Products
          </p>
        </Link>

        <Link
          href="/cart"
          className="rounded-xl bg-blue-100 p-6 shadow"
        >
          <h2 className="text-xl font-bold">
            Cart
          </h2>

          <p className="mt-2 text-gray-600">
            Ready to Checkout
          </p>
        </Link>

        <Link
          href="/orders"
          className="rounded-xl bg-yellow-100 p-6 shadow"
        >
          <h2 className="text-xl font-bold">
            My Orders
          </h2>

          <p className="mt-2 text-gray-600">
            Order History
          </p>
        </Link>

      </div>
    </div>
  );
}