interface DashboardCardProps {
  title: string;
  value: string | number;
}

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md border">
      <p className="text-gray-500">{title}</p>

      <h2 className="mt-2 text-3xl font-bold text-green-700">
        {value}
      </h2>
    </div>
  );
}