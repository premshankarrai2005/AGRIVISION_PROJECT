interface Props {
  paymentMethod: string;

  onChange: (
    method: string
  ) => void;
}

export default function PaymentMethod({
  paymentMethod,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        Payment Method
      </h2>

      <label className="flex gap-3">

        <input
          type="radio"
          checked={
            paymentMethod === "COD"
          }
          onChange={() =>
            onChange("COD")
          }
        />

        Cash on Delivery

      </label>

      <label className="mt-4 flex gap-3">

        <input
          type="radio"
          checked={
            paymentMethod ===
            "Online"
          }
          onChange={() =>
            onChange("Online")
          }
        />

        Online Payment

      </label>

    </div>
  );
}