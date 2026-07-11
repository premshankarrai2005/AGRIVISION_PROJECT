interface Props {
  total: number;

  onPlaceOrder: () => void;

  loading: boolean;
}

export default function OrderSummary({
  total,
  onPlaceOrder,
  loading,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        Order Summary
      </h2>

      <div className="flex justify-between">

        <span>Total</span>

        <span>₹{total}</span>

      </div>

      <button
        disabled={loading}
        onClick={onPlaceOrder}
        className="mt-6 w-full rounded-lg bg-green-600 py-3 text-white"
      >
        {loading
          ? "Placing..."
          : "Place Order"}
      </button>

    </div>
  );
}