"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import { Order } from "@/types/order";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import StatusButtons from "./StatusButtons";

import { updateOrderStatus } from "@/services/orderService";

interface Props {
  order: Order;
  reloadOrders: () => void;
}

export default function FarmerOrderCard({
  order,
  reloadOrders,
}: Props) {
  const handleStatus = async (
    status: string
  ) => {
    try {
      await updateOrderStatus(
        order._id,
        status
      );

      toast.success(
        "Order Updated"
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

      <div className="mb-5 flex justify-between">

        <h2 className="font-bold">
          #{order._id.slice(-6)}
        </h2>

        <OrderStatusBadge
          status={order.orderStatus}
        />

      </div>

      <p>
        <strong>Buyer :</strong>{" "}
        {order.buyer.name}
      </p>

      <p>
        <strong>Phone :</strong>{" "}
        {order.phone}
      </p>

      <p>
        <strong>Products :</strong>{" "}
        {order.products.length}
      </p>

      <p>
        <strong>Total :</strong> ₹
        {order.totalAmount}
      </p>

      <p>
        <strong>Date :</strong>{" "}
        {new Date(
          order.createdAt
        ).toLocaleDateString()}
      </p>

      <div className="mt-6">

        <StatusButtons
          status={order.orderStatus}
          onChange={handleStatus}
        />

      </div>

      <Link
        href={`/farmer/orders/${order._id}`}
        className="mt-6 block rounded-lg bg-blue-600 py-2 text-center text-white hover:bg-blue-700"
      >
        View Details
      </Link>

    </div>
  );
}