"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAdminDashboard } from "@/services/dashboardService";
import AdminDashboardStats from "./AdminDashboardStats";
import RecentProducts from "./RecentProducts";
import RecentUsers from "./RecentUsers";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const data = await getAdminDashboard();

      setDashboard(data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
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
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome 👋
        </h1>

        <p className="mt-2 text-lg text-gray-500">
          Admin Dashboard
        </p>
      </div>

      <AdminDashboardStats
        totalUsers={dashboard.totalUsers}
        totalFarmers={dashboard.totalFarmers}
        totalBuyers={dashboard.totalBuyers}
        totalProducts={dashboard.totalProducts}
        totalOrders={dashboard.totalOrders}
        revenue={dashboard.revenue}
      />

      <RecentUsers users={dashboard.recentUsers} />

      <RecentProducts
        products={dashboard.recentProducts}
      />

    </div>
  );
}   


