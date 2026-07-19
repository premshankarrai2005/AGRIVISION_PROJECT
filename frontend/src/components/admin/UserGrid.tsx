import { User } from "@/types/user";
import UserCard from "./UserCard";

interface Props {
  users: User[];
  reloadUsers: () => void;
}

export default function UserGrid({ users, reloadUsers }: Props) {
  if (users.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold">No Users Found</h2>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user._id} user={user} reloadUsers={reloadUsers} />
      ))}
    </div>
  );
}
