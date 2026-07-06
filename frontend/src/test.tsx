// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import DashboardStats from "@/components/dashboard/DashboardStats";
// import RecentProducts from "@/components/dashboard/RecentProducts";
// import QuickActions from "@/components/dashboard/QuickActions";

// import { getMyProducts } from "@/services/productService";
// import { Product } from "@/types/product";
// import DashboardCard from "@/components/dashboard/DashboardCard";

// export default function FarmerDashboard() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const data = await getMyProducts();

//       setProducts(data.products || data);
//     } catch (error: any) {
//       toast.error("Failed to load dashboard");
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-4xl font-bold">
//           Welcome 👋
//         </h1>

//         <h1 className="mb-8 text-3xl font-bold">
//           Dashboard
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Manage your farm products efficiently.
//         </p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//         <DashboardCard
//           title="Total Products"
//           value={25}
//         />

//         <DashboardCard
//           title="Total Orders"
//           value={52}
//         />

//         <DashboardCard
//           title="Revenue"
//           value="₹12,500"
//         />

//         <DashboardCard
//           title="Pending Orders"
//           value={8}
//         />
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