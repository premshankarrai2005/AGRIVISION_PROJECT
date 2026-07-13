"use client";

import { useRouter } from "next/navigation";

interface Props {
  cartItems: number;
  wishlistItems: number;
  totalOrders: number;
  pendingOrders: number;
}

export default function BuyerDashboardStats({
  cartItems,
  wishlistItems,
  totalOrders,
  pendingOrders,
}: Props) {
  const router = useRouter();

  const stats = [
    {
      title: "🛒 Cart Items",
      value: cartItems,
      color: "bg-blue-100 text-blue-700",
      path: "/cart",
    },
    {
      title: "❤️ Wishlist",
      value: wishlistItems,
      color: "bg-pink-100 text-pink-700",
      path: "/wishlist",
    },
    {
      title: "📦 Orders",
      value: totalOrders,
      color: "bg-green-100 text-green-700",
      path: "/orders",
    },
    {
      title: "⏳ Pending",
      value: pendingOrders,
      color: "bg-yellow-100 text-yellow-700",
      path: "/orders",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          onClick={() => router.push(item.path)}
          className={`cursor-pointer rounded-xl p-6 shadow transition-all duration-300 hover:scale-105 hover:shadow-lg ${item.color}`}
        >
          <p className="text-sm font-semibold">
            {item.title}
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}