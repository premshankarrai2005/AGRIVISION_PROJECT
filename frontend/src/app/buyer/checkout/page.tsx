"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import AddressForm from "@/components/checkout/AddressForm";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderSummary from "@/components/checkout/OrderSummary";

import { getCart } from "@/services/cartService";
import { placeOrder } from "@/services/orderService";

export default function CheckoutPage() {
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [total, setTotal] = useState(0);

  const [loading, setLoading] =
    useState(false);

  const loadCart = async () => {
    try {
      const data = await getCart();

      setTotal(data.total || 0);
    } catch {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      return toast.error(
        "Delivery address is required"
      );
    }

    if (!phone.trim()) {
      return toast.error(
        "Phone number is required"
      );
    }

    try {
      setLoading(true);

      await placeOrder({
        deliveryAddress: address,
        phone,
        paymentMethod,
      });

      toast.success(
        "Order placed successfully"
      );

      router.push("/buyer/orders");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-8 p-8 lg:grid-cols-3">

      <div className="space-y-6 lg:col-span-2">

        <AddressForm
          address={address}
          phone={phone}
          onAddressChange={setAddress}
          onPhoneChange={setPhone}
        />

        <PaymentMethod
          paymentMethod={paymentMethod}
          onChange={setPaymentMethod}
        />

      </div>

      <OrderSummary
        total={total}
        loading={loading}
        onPlaceOrder={handlePlaceOrder}
      />

    </div>
  );
}