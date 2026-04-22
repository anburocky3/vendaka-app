"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productsResponse = await fetch("/api/admin/products");
      const productsData = await productsResponse.json();
      setProducts(productsData);
    }
    fetchProducts();
  }, []);

  const deleteProduct = (id) => async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const response = await fetch("/api/admin/products/" + id, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete product");
      return;
    }

    setProducts((prev) => prev.filter((item) => item._id !== id));
    alert("Product deleted successfully");
  };

  return (
    <table className="w-full">
      <thead className="bg-blue-100 border-b border-blue-200">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
            Product Name
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
            Price
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
            Category
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-48">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-ys">
        {products.map((item) => (
          <tr key={item._id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 text-sm text-gray-900">
              <div className="flex items-center space-x-3 font-medium">
                {item.productImage && (
                  <img
                    src={`/api/${item.productImage}`}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <span>{item.productName}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(item.price)}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
            <td className="px-6 py-4 text-sm space-x-2">
              <Link
                href={"/admin/products/" + item._id}
                className="px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded transition-colors inline-block"
              >
                Edit{" "}
              </Link>
              <button
                className="px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded transition-colors"
                onClick={deleteProduct(item._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
