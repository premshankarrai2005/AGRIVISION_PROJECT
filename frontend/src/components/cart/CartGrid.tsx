"use client";

import { CartItem } from "@/types/cart";

import CartCard from "./CartCard";

interface Props {
  items: CartItem[];

  onIncrease: (id: string) => void;

  onDecrease: (id: string) => void;

  onRemove: (id: string) => void;
}

export default function CartGrid({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  if (items.length === 0) {
    return (
      <h2 className="py-20 text-center text-3xl">
        Cart is Empty
      </h2>
    );
  }

  return (
    <div className="space-y-5">
      {items.map((item) => (
        <CartCard
          key={item.product._id}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}