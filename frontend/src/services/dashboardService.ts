import api from "@/lib/api";

export const getFarmerDashboard =
  async () => {
    const response =
      await api.get("/orders/dashboard");

    return response.data;
  };