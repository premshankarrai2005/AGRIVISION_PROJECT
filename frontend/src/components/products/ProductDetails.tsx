"use client";

import Image from "next/image";

import Link from "next/link";

import { Product } from "@/types/product";

interface Props{

    product:Product;

}

export default function ProductDetails({product}:Props){

    return(

        <div className="grid lg:grid-cols-2 gap-12">

            <div>

                <div className="relative w-full h-125">

                    <Image

                        src={product.image || "/placeholder.jpg"}

                        alt={product.name}

                        fill

                        className="rounded-xl object-cover"

                    />

                </div>

            </div>

            <div>

                <h1 className="text-4xl font-bold">

                    {product.name}

                </h1>

                <div className="mt-6 space-y-4">

                    <p>

                        <span className="font-semibold">

                            Category :

                        </span>

                        {" "}

                        {product.category}

                    </p>

                    <p>

                        <span className="font-semibold">

                            Price :

                        </span>

                        ₹ {product.price}

                    </p>

                    <p>

                        <span className="font-semibold">

                            Quantity :

                        </span>

                        {product.quantity} Kg

                    </p>

                    <p>

                        <span className="font-semibold">

                            Location :

                        </span>

                        {product.location}

                    </p>

                    <p>

                        <span className="font-semibold">

                            Status :

                        </span>

                        {product.status}

                    </p>

                    <p>

                        <span className="font-semibold">

                            Description :

                        </span>

                        {product.description}

                    </p>

                    <p>

                        <span className="font-semibold">

                            Farmer :

                        </span>

                        {typeof product.farmer === "object"
                            ? product.farmer.name
                            : "Farmer"}

                    </p>

                    <p>

                        ⭐ {product.averageRating}

                        ({product.totalReviews} Reviews)

                    </p>

                    <p>

                        Added On :

                        {" "}

                        {new Date(product.createdAt).toLocaleDateString()}

                    </p>

                </div>

                <div className="flex gap-4 mt-8">

                    <Link

                        href={`/farmer/products/${product._id}/edit`}

                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                    >

                        Edit Product

                    </Link>

                    <Link

                        href="/farmer/products"

                        className="bg-gray-600 text-white px-6 py-3 rounded-lg"

                    >

                        Back

                    </Link>

                </div>

            </div>

        </div>

    );

}