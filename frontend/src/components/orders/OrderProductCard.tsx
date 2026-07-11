"use client";

import Image from "next/image";

import { OrderItem } from "@/types/order";

interface Props {
  item: OrderItem;
}

export default function OrderProductCard({
  item,
}: Props) {
  return (
    <div className="flex items-center gap-5 rounded-xl border p-4">

      <div className="relative h-24 w-24">

        <Image
          src={
            item.product.image ||
            "https://placehold.co/300x300"
          }
          alt={item.product.name}
          fill
          className="rounded-lg object-cover"
        />

      </div>

      <div className="flex-1">

        <h2 className="text-lg font-bold">
          {item.product.name}
        </h2>

        <p className="text-gray-500">
          Quantity : {item.quantity}
        </p>

        <p className="text-gray-500">
          Price : ₹{item.price}
        </p>

        <p className="text-gray-500">
          Total : ₹{item.price * item.quantity}
        </p>

      </div>

    </div>
  );
}