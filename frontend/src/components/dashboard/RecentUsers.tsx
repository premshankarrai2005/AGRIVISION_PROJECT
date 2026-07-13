"use client";

interface Props {
  users: any[];
}

export default function RecentUsers({
  users,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Users
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Name
              </th>

              <th className="text-left">
                Email
              </th>

              <th className="text-left">
                Role
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b"
              >
                <td className="py-3">
                  {user.name}
                </td>

                <td>{user.email}</td>

                <td className="capitalize">
                  {user.role}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}