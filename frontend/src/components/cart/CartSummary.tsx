import Link from "next/link";
interface Props {
  subtotal: number;

  delivery: number;

  total: number;

  onClear: () => void;
}

export default function CartSummary({
  subtotal,
  delivery,
  total,
  onClear,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-5 text-2xl font-bold">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>

          <span>₹{delivery}</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span>₹{total}</span>
        </div>
      </div>

      <button
        onClick={onClear}
        className="mt-6 w-full rounded-lg bg-red-600 py-3 text-white"
      >
        Clear Cart
      </button>

      <Link
        href="/buyer/checkout"
        className="mt-6 block w-full rounded-lg bg-green-600 py-3 text-center text-white hover:bg-green-700"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
