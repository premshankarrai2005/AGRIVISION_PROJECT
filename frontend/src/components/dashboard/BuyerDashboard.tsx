"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import BuyerDashboardStats from "./BuyerDashboardStats";
import WishlistGrid from "@/components/wishlist/WishlistGrid";
import OrderGrid from "@/components/orders/OrderGrid";

import { getBuyerDashboard } from "@/services/dashboardService";

export default function BuyerDashboard() {
  const [dashboard, setDashboard] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const data = await getBuyerDashboard();

      setDashboard(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading || !dashboard) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Buyer Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">Welcome 👋</h1>

        <p className="mt-2 text-lg text-gray-500">Buyer Dashboard</p>
      </div>

      <BuyerDashboardStats
        cartItems={dashboard.cartItems}
        wishlistItems={dashboard.wishlistItems}
        totalOrders={dashboard.totalOrders}
        pendingOrders={dashboard.pendingOrders}
      />

      <div>
        <h2 className="mb-5 text-2xl font-bold">Recent Orders</h2>

        <OrderGrid orders={dashboard.recentOrders} reloadOrders={() => {}} />
      </div>

      <div>
        <h2 className="mb-5 text-2xl font-bold">Recommended Products</h2>

        <WishlistGrid
          wishlist={dashboard.recommendedProducts}
          onRemove={() => {}}
        />
      </div>
    </div>
  );
}
