interface Props {
  address: string;

  phone: string;

  onAddressChange: (
    value: string
  ) => void;

  onPhoneChange: (
    value: string
  ) => void;
}

export default function AddressForm({
  address,
  phone,
  onAddressChange,
  onPhoneChange,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        Delivery Details
      </h2>

      <textarea
        value={address}
        onChange={(e) =>
          onAddressChange(
            e.target.value
          )
        }
        rows={4}
        placeholder="Enter delivery address"
        className="mb-5 w-full rounded-lg border p-3"
      />

      <input
        type="text"
        value={phone}
        onChange={(e) =>
          onPhoneChange(
            e.target.value
          )
        }
        placeholder="Phone Number"
        className="w-full rounded-lg border p-3"
      />

    </div>
  );
}