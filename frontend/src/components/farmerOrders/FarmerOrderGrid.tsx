import { Order } from "@/types/order";
import FarmerOrderCard from "./FarmerOrderCard";

interface Props {
  orders: Order[];
  reloadOrders: () => void;
}

export default function FarmerOrderGrid({
  orders,
  reloadOrders,
}: Props) {
  if (orders.length === 0) {
    return (
      <div className="py-20 text-center">

        <h2 className="text-3xl font-bold text-gray-500">
          No Orders Yet
        </h2>

        <p className="mt-3 text-gray-400">
          Orders from buyers will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {orders.map((order) => (
        <FarmerOrderCard
          key={order._id}
          order={order}
          reloadOrders={reloadOrders}
        />
      ))}

    </div>
  );
}