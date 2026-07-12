"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentProducts from "@/components/dashboard/RecentProducts";
import SalesChart from "@/components/dashboard/SalesChart";

import { getFarmerDashboard } from "@/services/dashboardService";

export default function FarmerDashboard() {
  const [dashboard, setDashboard] = useState<any>();

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const data = await getFarmerDashboard();

      setDashboard(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed");
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
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Welcome 👋</h1>

        <p className="text-gray-500">Farmer Dashboard</p>
      </div>

      <DashboardStats
        totalProducts={dashboard.totalProducts}
        totalOrders={dashboard.totalOrders}
        revenue={dashboard.revenue}
        pendingOrders={dashboard.pendingOrders}
      />
      <SalesChart revenue={dashboard.monthlyRevenue} />

      <RecentProducts products={dashboard.recentProducts} />

      <QuickActions />
    </div>
  );
}
