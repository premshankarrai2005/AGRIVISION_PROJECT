// export default function OrdersPage() {
//   return <h1 className="text-3xl font-bold">Orders</h1>;
// }
"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Order } from "@/types/order";

import { getFarmerOrders } from "@/services/orderService";

import FarmerOrderGrid from "@/components/farmerOrders/FarmerOrderGrid";
import EarningsCard from "@/components/farmerOrders/EarningsCard";

export default function FarmerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getFarmerOrders();

      setOrders(data.orders);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-2xl font-bold">
          Loading Orders...
        </h2>
      </div>
    );
  }

  const totalRevenue = orders
    .filter((o) => o.orderStatus === "Delivered")
    .reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

  const pendingOrders = orders.filter(
    (o) =>
      o.orderStatus === "Pending" ||
      o.orderStatus === "Accepted" ||
      o.orderStatus === "Packed" ||
      o.orderStatus === "Shipped"
  ).length;

  const completedOrders = orders.filter(
    (o) => o.orderStatus === "Delivered"
  ).length;

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Farmer Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all buyer orders.
        </p>

      </div>

      <EarningsCard
        totalOrders={orders.length}
        completedOrders={completedOrders}
        pendingOrders={pendingOrders}
        revenue={totalRevenue}
      />

      <FarmerOrderGrid
        orders={orders}
        reloadOrders={loadOrders}
      />

    </div>
  );
}