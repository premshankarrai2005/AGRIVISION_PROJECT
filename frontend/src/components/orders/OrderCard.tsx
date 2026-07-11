"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import { Order } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";

import { cancelOrder } from "@/services/orderService";

interface Props {
  order: Order;

  reloadOrders: () => void;
}

export default function OrderCard({
  order,
  reloadOrders,
}: Props) {
  const handleCancel = async () => {
    const confirmCancel =
      window.confirm(
        "Cancel this order?"
      );

    if (!confirmCancel) return;

    try {
      await cancelOrder(order._id);

      toast.success(
        "Order Cancelled"
      );

      reloadOrders();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed"
      );
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="font-bold">
          Order #{order._id.slice(-6)}
        </h2>

        <OrderStatusBadge
          status={order.orderStatus}
        />

      </div>

      <div className="space-y-2">

        <p>
          <strong>Items :</strong>{" "}
          {order.products.length}
        </p>

        <p>
          <strong>Total :</strong> ₹
          {order.totalAmount}
        </p>

        <p>
          <strong>Payment :</strong>{" "}
          {order.paymentMethod}
        </p>

        <p>
          <strong>Date :</strong>{" "}
          {new Date(
            order.createdAt
          ).toLocaleDateString()}
        </p>

      </div>

      <div className="mt-6 flex gap-3">

        <Link
          href={`/buyer/orders/${order._id}`}
          className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-white"
        >
          View Details
        </Link>

        {order.orderStatus ===
          "Pending" && (
          <button
            onClick={handleCancel}
            className="flex-1 rounded-lg bg-red-600 py-2 text-white"
          >
            Cancel
          </button>
        )}

      </div>

    </div>
  );
}