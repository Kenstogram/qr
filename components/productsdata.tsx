"use client";

import React, { useEffect, useState } from "react";
import { Card, Title } from "@tremor/react";
import { GetProducts } from "@/actions/product-requests";
import ArchiveProductButton from "@/components/ArchiveProductButton"; // Import the ArchiveProductButton component
import { Trash2 } from 'lucide-react';

export default function ProductsDataMockup() {
  const [productData, setProductData] = useState<any[]>([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const products = await GetProducts();
        if (Array.isArray(products)) {
          setProductData(products);
        } else {
          console.error("Products data is not an array:", products);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const handleArchiveSuccess = () => {
      // Refresh products list
      fetchData();
    };

  return (
    <div className="flex flex-col">
      <Title>Product Collection</Title>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productData.map((product: any, index: number) => (
          <Card className="p-4 rounded-lg shadow-md rounded-xl bg-white" key={index}>
            <img src={product.thumbnail} alt={product.title} className="w-full h-auto mb-4" />
            <Title className="text-lg font-semibold mb-2">{product.title}</Title>
            <p className="text-gray-700">Price: ${(product.variants?.[0]?.prices?.[0]?.amount / 100)?.toFixed(2)}</p>
            {/* Add the ArchiveProductButton component passing the product id */}
            <ArchiveProductButton productId={product.id} onArchiveSuccess={handleArchiveSuccess}><Trash2 /></ArchiveProductButton>
          </Card>
        ))}
      </div>
    </div>
  );
}
