"use client";

import Image from "next/image";

import { CartItem } from "@/types/cart";

interface Props {
  item: CartItem;

  onIncrease: (id: string) => void;

  onDecrease: (id: string) => void;

  onRemove: (id: string) => void;
}

export default function CartCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <div className="flex items-center gap-5 rounded-xl bg-white p-5 shadow">

      <div className="relative h-28 w-28">

        <Image
          src={
            item.product.image ||
            "https://placehold.co/300x300"
          }
          alt={item.product.name}
          fill
          className="rounded object-cover"
        />

      </div>

      <div className="flex-1">

        <h2 className="text-xl font-bold">
          {item.product.name}
        </h2>

        <p>₹{item.product.price}/Kg</p>

        <div className="mt-3 flex items-center gap-3">

          <button
            onClick={() =>
              onDecrease(item.product._id)
            }
            className="rounded bg-gray-200 px-3"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              onIncrease(item.product._id)
            }
            className="rounded bg-gray-200 px-3"
          >
            +
          </button>

        </div>

      </div>

      <button
        onClick={() =>
          onRemove(item.product._id)
        }
        className="rounded-lg bg-red-600 px-4 py-2 text-white"
      >
        Remove
      </button>

    </div>
  );
}