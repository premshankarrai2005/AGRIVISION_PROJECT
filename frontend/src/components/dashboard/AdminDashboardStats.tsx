"use client";

import { useRouter } from "next/navigation";

interface Props {
  totalUsers: number;
  totalFarmers: number;
  totalBuyers: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
}

export default function AdminDashboardStats({
  totalUsers,
  totalFarmers,
  totalBuyers,
  totalProducts,
  totalOrders,
  revenue,
}: Props) {

  const router = useRouter();

  const stats = [
    {
      title: "Users",
      value: totalUsers,
      color: "bg-blue-100 text-blue-700",
      path: "/admin/users",
    },
    {
      title: "Farmers",
      value: totalFarmers,
      color: "bg-green-100 text-green-700",
      path: "/admin/users",
    },
    {
      title: "Buyers",
      value: totalBuyers,
      color: "bg-purple-100 text-purple-700",
      path: "/admin/users",
    },
    {
      title: "Products",
      value: totalProducts,
      color: "bg-yellow-100 text-yellow-700",
      path: "/admin/products",
    },
    {
      title: "Orders",
      value: totalOrders,
      color: "bg-red-100 text-red-700",
      path: "/admin/orders",
    },
    {
      title: "Revenue",
      value: `₹${revenue}`,
      color: "bg-emerald-100 text-emerald-700",
      path: "/admin/orders",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {stats.map((item) => (

        <div
          key={item.title}
          onClick={() =>
            router.push(item.path)
          }
          className={`cursor-pointer rounded-xl p-6 shadow transition-all duration-300 hover:scale-105 hover:shadow-lg ${item.color}`}
        >

          <p>{item.title}</p>

          <h2 className="mt-4 text-4xl font-bold">
            {item.value}
          </h2>

        </div>

      ))}

    </div>
  );
}