"use client";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/products", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-6 gap-5">
        {products.map((product, index) => (
          <div key={index} className="bg-blue-50">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-contain"
            />
            <div className="px-10 py-5">
              <h4 className="text-lg font-bold">{product.name}</h4>
              <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
            </div>
            <button
              type="button"
              className="text-sm font-bold text-white bg-blue-500 px-4 py-2 rounded-b-md w-full hover:bg-blue-600 transition-colors duration-300"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
