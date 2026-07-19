interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function ProductSearch({
  search,
  setSearch,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Search product..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full rounded-lg border p-3"
    />
  );
}