"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";

import { getOrderById } from "@/services/orderService";

import { Order } from "@/types/order";

import OrderStatusBadge from "@/components/orders/OrderStatusBadge";

import OrderTimeline from "@/components/orders/OrderTimeline";
import OrderProductCard from "@/components/orders/OrderProductCard";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);

  const [loading, setLoading] = useState(true);

  const loadOrder = async () => {
    try {
      const data = await getOrderById(id as string);

      setOrder(data.order);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  if (!order) {
    return <div className="p-10">Order Not Found</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Order Details</h1>

        <OrderStatusBadge status={order.orderStatus} />
      </div>

      {/* Buyer */}

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">Delivery Information</h2>

        <p>
          <strong>Address :</strong> {order.deliveryAddress}
        </p>

        <p className="mt-2">
          <strong>Phone :</strong> {order.phone}
        </p>
      </div>

      {/* Payment */}

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">Payment</h2>

        <p>
          <strong>Method :</strong> {order.paymentMethod}
        </p>

        <p className="mt-2">
          <strong>Status :</strong> {order.paymentStatus}
        </p>

        <p className="mt-2">
          <strong>Total :</strong> ₹{order.totalAmount}
        </p>
      </div>

      {/* Products */}

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">Ordered Products</h2>

        <div className="space-y-4">
          {order.products.map((item) => (
            <OrderProductCard key={item.product._id} item={item} />
          ))}
        </div>
      </div>

      <OrderTimeline currentStatus={order.orderStatus} />
    </div>
  );
}
