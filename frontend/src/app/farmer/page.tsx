import DashboardCard from "@/components/dashboard/DashboardCard";

export default function FarmerDashboard() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Products"
          value={25}
        />

        <DashboardCard
          title="Total Orders"
          value={52}
        />

        <DashboardCard
          title="Revenue"
          value="₹12,500"
        />

        <DashboardCard
          title="Pending Orders"
          value={8}
        />
      </div>
    </>
  );
}        