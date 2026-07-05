"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Product } from "@/types/product";

import {
    getProductById,
    updateProduct,
} from "@/services/productService";

import EditProductForm from "@/components/products/EditProductForm";

export default function EditProductPage() {

    const { id } = useParams();

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {

        const loadProduct = async () => {

            try {

                const data = await getProductById(id as string);

                setProduct(data);

            }

            catch (error: any) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to load product"
                );

            }

            finally {

                setLoading(false);

            }

        };

        loadProduct();

    }, [id]);

    const handleSubmit = async (formData: FormData) => {

        try {

            await updateProduct(id as string, formData);

            toast.success("Product Updated Successfully");

            router.push("/farmer/products");

        }

        catch (error: any) {

            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <h2 className="text-2xl font-bold">
                    Loading Product...
                </h2>

            </div>

        );

    }

    if (!product) {

        return (

            <div className="flex justify-center items-center h-screen">

                Product Not Found

            </div>

        );

    }

    return (

        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">

                Edit Product

            </h1>

            <EditProductForm

                product={product}

                onSubmit={handleSubmit}

            />

        </div>

    );

}