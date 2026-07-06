interface DashboardStatsProps {
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  pendingOrders: number;
}

export default function DashboardStats({
  totalProducts,
  totalOrders,
  revenue,
  pendingOrders,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Revenue",
      value: `₹${revenue}`,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className={`rounded-xl p-6 shadow ${item.color}`}
        >
          <p className="text-sm font-medium">{item.title}</p>

          <h2 className="mt-3 text-3xl font-bold">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}