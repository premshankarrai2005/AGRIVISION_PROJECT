import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}