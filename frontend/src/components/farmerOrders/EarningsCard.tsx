interface Props {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  revenue: number;
}

export default function EarningsCard({
  totalOrders,
  completedOrders,
  pendingOrders,
  revenue,
}: Props) {
  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Completed",
      value: completedOrders,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Pending",
      value: pendingOrders,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Revenue",
      value: `₹${revenue}`,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-xl p-6 shadow ${card.color}`}
        >
          <p className="text-sm font-medium">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}

    </div>
  );
}