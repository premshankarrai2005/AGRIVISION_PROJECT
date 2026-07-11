"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CartGrid from "@/components/cart/CartGrid";
import CartSummary from "@/components/cart/CartSummary";

import {
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
} from "@/services/cartService";

import { CartItem } from "@/types/cart";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setItems(data.cart?.items || []);
      setSubtotal(data.subtotal || 0);
      setDelivery(data.delivery || 0);
      setTotal(data.total || 0);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load cart"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleIncrease = async (productId: string) => {
    const item = items.find(
      (i) => i.product._id === productId
    );

    if (!item) return;

    await updateCart(
      productId,
      item.quantity + 1
    );

    loadCart();
  };

  const handleDecrease = async (productId: string) => {
    const item = items.find(
      (i) => i.product._id === productId
    );

    if (!item) return;

    if (item.quantity === 1) {
      handleRemove(productId);

      return;
    }

    await updateCart(
      productId,
      item.quantity - 1
    );

    loadCart();
  };

  const handleRemove = async (
    productId: string
  ) => {
    try {
      await removeFromCart(productId);

      toast.success("Removed");

      loadCart();
    } catch {
      toast.error("Failed");
    }
  };

  const handleClear = async () => {
    if (
      !window.confirm(
        "Clear your entire cart?"
      )
    )
      return;

    try {
      await clearCart();

      toast.success("Cart Cleared");

      loadCart();
    } catch {
      toast.error("Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">

        <h2 className="text-3xl font-bold">
          Loading Cart...
        </h2>

      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 p-8 lg:grid-cols-3">

      <div className="lg:col-span-2">

        <h1 className="mb-8 text-4xl font-bold">
          My Cart
        </h1>

        <CartGrid
          items={items}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
        />

      </div>

      <CartSummary
        subtotal={subtotal}
        delivery={delivery}
        total={total}
        onClear={handleClear}
      />

    </div>
  );
}