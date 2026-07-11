"use client";

interface Props {
  status: string;
  onChange: (status: string) => void;
}

export default function StatusButtons({
  status,
  onChange,
}: Props) {
  switch (status) {
    case "Pending":
      return (
        <div className="flex gap-3">
          <button
            onClick={() => onChange("Accepted")}
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Accept
          </button>

          <button
            onClick={() => onChange("Cancelled")}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      );

    case "Accepted":
      return (
        <button
          onClick={() => onChange("Packed")}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Mark Packed
        </button>
      );

    case "Packed":
      return (
        <button
          onClick={() => onChange("Shipped")}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Mark Shipped
        </button>
      );

    case "Shipped":
      return (
        <button
          onClick={() => onChange("Delivered")}
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          Mark Delivered
        </button>
      );

    case "Delivered":
      return (
        <span className="rounded-lg bg-green-100 px-4 py-2 font-semibold text-green-700">
          Completed
        </span>
      );

    case "Cancelled":
      return (
        <span className="rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700">
          Cancelled
        </span>
      );

    default:
      return null;
  }
}