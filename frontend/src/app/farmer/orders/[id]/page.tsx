"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import { Order } from "@/types/order";
import {
  getOrderById,
  updateOrderStatus,
} from "@/services/orderService";

import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import FarmerOrderTimeline from "@/components/farmerOrders/FarmerOrderTimeline";
import StatusButtons from "@/components/farmerOrders/StatusButtons";

export default function FarmerOrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);

  const [loading, setLoading] = useState(true);

  const loadOrder = async () => {
    try {
      const data = await getOrderById(id as string);

      setOrder(data.order);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load order"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadOrder();
  }, [id]);

  const handleStatus = async (status: string) => {
    if (!order) return;

    try {
      await updateOrderStatus(order._id, status);

      toast.success("Order Updated");

      loadOrder();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return <div className="p-8">Order not found.</div>;
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Farmer Order Details
        </h1>

        <OrderStatusBadge
          status={order.orderStatus}
        />

      </div>

      {/* Buyer */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-bold">
          Buyer Information
        </h2>

        <p>
          <strong>Name :</strong> {order.buyer.name}
        </p>

        <p>
          <strong>Email :</strong> {order.buyer.email}
        </p>

        <p>
          <strong>Phone :</strong> {order.phone}
        </p>

        <p>
          <strong>Address :</strong>{" "}
          {order.deliveryAddress}
        </p>

      </div>

      {/* Products */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-5 text-xl font-bold">
          Products
        </h2>

        <div className="space-y-5">

          {order.products.map((item) => (

            <div
              key={item.product._id}
              className="flex justify-between border-b pb-3"
            >

              <div>

                <h3 className="font-semibold">
                  {item.product.name}
                </h3>

                <p>
                  Qty : {item.quantity}
                </p>

              </div>

              <p className="font-bold">
                ₹{item.price}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Timeline */}

      <FarmerOrderTimeline
        currentStatus={order.orderStatus}
      />

      {/* Status */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-5 text-xl font-bold">
          Update Status
        </h2>

        <StatusButtons
          status={order.orderStatus}
          onChange={handleStatus}
        />

      </div>

    </div>
  );
}