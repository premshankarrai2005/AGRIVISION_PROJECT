// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import DashboardStats from "@/components/dashboard/DashboardStats";
// import RecentProducts from "@/components/dashboard/RecentProducts";
// import QuickActions from "@/components/dashboard/QuickActions";

// import { getMyProducts } from "@/services/productService";
// import { Product } from "@/types/product";

// export default function FarmerDashboard() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const loadDashboard = async () => {
//     try {
//       setLoading(true);

//       const data = await getMyProducts({
//         page: 1,
//         limit: 5,
//       });

//       setProducts(data.products);
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to load dashboard"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <h2 className="text-2xl font-bold">
//           Loading Dashboard...
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">

//       <div>
//         <h1 className="text-4xl font-bold">
//           Welcome 👋
//         </h1>

//         <p className="text-gray-500 mt-2">
//           Manage your farm products efficiently.
//         </p>
//       </div>

//       <DashboardStats
//         totalProducts={products.length}
//         totalOrders={52}
//         revenue={12500}
//         pendingOrders={8}
//       />

//       <RecentProducts products={products} />

//       <QuickActions />

//     </div>
//   );
// }

"use client";

import FarmerDashboard from "@/components/dashboard/FarmerDashboard";

export default function FarmerPage() {
  return <FarmerDashboard />;
}
