"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";

import { Product } from "@/types/product";

import { getProductById } from "@/services/productService";

import ProductDetails from "@/components/products/ProductDetails";

export default function ProductDetailsPage() {

    const { id } = useParams();

    const [product,setProduct]=useState<Product|null>(null);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        const loadProduct=async()=>{

            try{

                const data=await getProductById(id as string);

                setProduct(data);

            }

            catch(error:any){

                toast.error("Unable to load product");

            }

            finally{

                setLoading(false);

            }

        };

        loadProduct();

    },[id]);

    if(loading){

        return(

            <div className="flex justify-center items-center h-screen">

                Loading Product...

            </div>

        );

    }

    if(!product){

        return(

            <div className="text-center mt-20">

                Product Not Found

            </div>

        );

    }

    return(

        <div className="max-w-7xl mx-auto p-8">

            <ProductDetails product={product}/>

        </div>

    );

}