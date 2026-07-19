interface Props {
  role: string;
  setRole: (role: string) => void;
}

export default function UserFilter({
  role,
  setRole,
}: Props) {
  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="rounded-lg border p-3"
    >
      <option value="all">All Users</option>
      <option value="admin">Admin</option>
      <option value="farmer">Farmer</option>
      <option value="buyer">Buyer</option>
    </select>
  );
}