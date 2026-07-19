import AdminProductCard from "./AdminProductCard";

interface Props {
  products: any[];

  reloadProducts: () => void;
}

export default function AdminProductGrid({
  products,
  reloadProducts,
}: Props) {

  if (products.length === 0) {

    return (
      <div className="py-20 text-center">

        No Products

      </div>
    );

  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {products.map((product) => (
        <AdminProductCard
          key={product._id}
          product={product}
          reloadProducts={reloadProducts}
        />
      ))}

    </div>
  );
}