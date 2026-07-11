interface Props {
  status: string;
}

export default function OrderStatusBadge({
  status,
}: Props) {
  let color =
    "bg-gray-100 text-gray-700";

  switch (status) {
    case "Pending":
      color =
        "bg-yellow-100 text-yellow-700";
      break;

    case "Accepted":
      color =
        "bg-blue-100 text-blue-700";
      break;

    case "Packed":
      color =
        "bg-purple-100 text-purple-700";
      break;

    case "Shipped":
      color =
        "bg-indigo-100 text-indigo-700";
      break;

    case "Delivered":
      color =
        "bg-green-100 text-green-700";
      break;

    case "Cancelled":
      color =
        "bg-red-100 text-red-700";
      break;
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${color}`}
    >
      {status}
    </span>
  );
}