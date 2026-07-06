import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <Link
          href="/farmer/products/add"
          className="bg-green-600 text-white text-center py-3 rounded-lg"
        >
          + Add Product
        </Link>

        <Link
          href="/farmer/products"
          className="bg-blue-600 text-white text-center py-3 rounded-lg"
        >
          My Products
        </Link>

        <Link
          href="/farmer/orders"
          className="bg-orange-600 text-white text-center py-3 rounded-lg"
        >
          Orders
        </Link>

        <Link
          href="/farmer/profile"
          className="bg-gray-700 text-white text-center py-3 rounded-lg"
        >
          Profile
        </Link>

      </div>
    </div>
  );
}