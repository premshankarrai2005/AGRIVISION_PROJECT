interface Props {
  status: string;
  setStatus: (value: string) => void;
}

export default function ProductStatusFilter({
  status,
  setStatus,
}: Props) {
  return (
    <select
      value={status}
      onChange={(e) =>
        setStatus(e.target.value)
      }
      className="rounded-lg border p-3"
    >
      <option value="all">
        All Status
      </option>

      <option value="available">
        Available
      </option>

      <option value="out_of_stock">
        Out Of Stock
      </option>
    </select>
  );
}