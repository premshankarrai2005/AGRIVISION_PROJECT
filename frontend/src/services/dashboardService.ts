import api from "@/lib/api";

export const getFarmerDashboard = async () => {
  const response = await api.get("/dashboard/farmer");
  return response.data;
};

export const getBuyerDashboard = async () => {
  const response = await api.get("/dashboard/buyer");
  return response.data;
};

export const getAdminDashboard = async () => {
  const response = await api.get("/dashboard/admin");
  return response.data;
};