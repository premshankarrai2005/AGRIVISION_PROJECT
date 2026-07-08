import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductInfo({
  product,
}: Props) {
  return (
    <div className="space-y-4">

      <h1 className="text-4xl font-bold">
        {product.name}
      </h1>

      <p className="text-gray-500">
        {product.category}
      </p>

      <h2 className="text-3xl font-bold text-green-600">
        ₹{product.price}/Kg
      </h2>

      <p>

        <strong>Quantity :</strong>

        {" "}
        {product.quantity} Kg

      </p>

      <p>

        <strong>Location :</strong>

        {" "}
        {product.location}

      </p>

      <p>

        <strong>Status :</strong>

        {" "}
        {product.status}

      </p>

      <p>

        ⭐ {product.averageRating}

        {" "}

        ({product.totalReviews})

      </p>

      <div>

        <h3 className="text-xl font-semibold mb-2">
          Description
        </h3>

        <p className="text-gray-600">
          {product.description}
        </p>

      </div>

      <div>

        <h3 className="text-xl font-semibold mb-2">
          Farmer
        </h3>

        <p>{product.farmer.name}</p>

      </div>

    </div>
  );
}