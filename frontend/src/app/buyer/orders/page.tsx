"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { Order } from "@/types/order";

import { getBuyerOrders } from "@/services/orderService";

import OrderGrid from "@/components/orders/OrderGrid"; 

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data =
        await getBuyerOrders();

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

  return (
    <div className="mx-auto max-w-7xl p-8">

      <h1 className="mb-8 text-4xl font-bold">

        My Orders

      </h1>

      <OrderGrid
        orders={orders}
        reloadOrders={loadOrders}
      />

    </div>
  );
}