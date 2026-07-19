interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function UserSearch({
  search,
  setSearch,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-lg border p-3 outline-none focus:border-green-600"
    />
  );
}