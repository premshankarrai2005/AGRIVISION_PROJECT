// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import toast from "react-hot-toast";

// import { Product } from "@/types/product";

// import {
//   deleteProduct,
//   getMyProducts,
// } from "@/services/productService";

// import ProductGrid from "@/components/products/ProductGrid";
// import SearchBar from "@/components/products/SearchBar";
// import FilterBar from "@/components/products/FilterBar";

// export default function FarmerProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);

//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");

//   const [category, setCategory] = useState("All");

//   const [status, setStatus] = useState("All");

//   const [sort, setSort] = useState("");

//   const loadProducts = async () => {
//     try {
//       setLoading(true);

//       const data = await getMyProducts({
//         search,
//         category,
//         status,
//         sort,
//       });

//       setProducts(data.products);
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to load products"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       loadProducts();
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [search, category, status, sort]);

//   const handleDelete = async (id: string) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this product?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteProduct(id);

//       toast.success("Product deleted successfully");

//       loadProducts();
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message ||
//           "Delete failed"
//       );
//     }
//   };

//   const resetFilters = () => {
//     setSearch("");

//     setCategory("All");

//     setStatus("All");

//     setSort("");
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h2 className="text-2xl font-bold">
//           Loading Products...
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">

//       {/* Header */}

//       <div className="flex justify-between items-center mb-8">

//         <div>

//           <h1 className="text-3xl font-bold">

//             My Products

//           </h1>

//           <p className="text-gray-500 mt-2">

//             Manage all your farm products.

//           </p>

//         </div>

//         <Link
//           href="/farmer/products/add"
//           className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
//         >
//           + Add Product
//         </Link>

//       </div>

//       {/* Search */}

//       <div className="mb-6">

//         <SearchBar
//           value={search}
//           onChange={setSearch}
//         />

//       </div>

//       {/* Filters */}

//       <div className="mb-8">

//         <FilterBar
//           category={category}
//           status={status}
//           sort={sort}
//           onCategoryChange={setCategory}
//           onStatusChange={setStatus}
//           onSortChange={setSort}
//           onReset={resetFilters}
//         />

//       </div>

//       {/* Products */}

//       <ProductGrid
//         products={products}
//         onDelete={handleDelete}
//       />

//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentProducts from "@/components/dashboard/RecentProducts";
import QuickActions from "@/components/dashboard/QuickActions";

import { getMyProducts } from "@/services/productService";
import { Product } from "@/types/product";

export default function FarmerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await getMyProducts({
        page: 1,
        limit: 5,
      });

      setProducts(data.products);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your farm products efficiently.
        </p>
      </div>

      <DashboardStats
        totalProducts={products.length}
        totalOrders={52}
        revenue={12500}
        pendingOrders={8}
      />

      <RecentProducts products={products} />

      <QuickActions />

    </div>
  );
}

// "use client";

// export default function FarmerDashboard() {
//   return (
//     <div>
//       <h1>Dashboard Working ....</h1>
//     </div>
//   );
// } 