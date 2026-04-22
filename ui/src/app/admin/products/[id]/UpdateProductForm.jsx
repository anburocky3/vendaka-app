"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileInput from "@/components/ui/forms/Fileinput";
import Input from "@/components/ui/forms/Input";
import Label from "@/components/ui/forms/Label";
import Select from "@/components/ui/forms/Select";
import TextArea from "@/components/ui/forms/Textarea";
import FormError from "@/components/ui/forms/FormError";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const productSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["electronics", "clothing", "home"]),
  productImage: z.any().optional(),
});

export default function UpdateProductForm({ productId }) {
  const router = useRouter();
  const [loadError, setLoadError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      price: "",
      description: "",
      category: "electronics",
      productImage: null,
    },
  });

  useEffect(() => {
    if (!productId) return;

    let cancelled = false;

    async function getInitialData() {
      try {
        setLoadError("");

        const response = await fetch("/api/admin/products/" + productId, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const msg = "Failed to load product for editing";
          if (!cancelled) setLoadError(msg);
          return;
        }

        const product = await response.json();

        if (cancelled) return;

        reset({
          productName: product.productName || "",
          price: product.price ?? "",
          description: product.description || "",
          category: product.category || "electronics",
          productImage: null,
        });
      } catch {
        if (!cancelled)
          setLoadError("Something went wrong while loading product");
      }
    }

    getInitialData();

    return () => {
      cancelled = true;
    };
  }, [productId, reset]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("price", String(values.price));
    formData.append("description", values.description);
    formData.append("category", values.category);

    if (values.productImage?.[0]) {
      formData.append("productImage", values.productImage[0]);
    }

    const response = await fetch("/api/admin/products/" + productId, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload?.error || "Failed to update product");
    }

    alert("Product updated successfully!");
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
      <div className="p-6 space-y-6">
        {loadError ? <FormError message={loadError} /> : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              name="productName"
              placeholder="Enter product name"
              {...register("productName")}
            />
            <FormError message={errors.productName?.message} />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              {...register("price")}
            />
            <FormError message={errors.price?.message} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              placeholder="Enter product description"
              rows={6}
              {...register("description")}
            />
            <FormError message={errors.description?.message} />
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select id="category" name="category" {...register("category")}>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
              </Select>
              <FormError message={errors.category?.message} />
            </div>
            <div>
              <Label htmlFor="productImage">Product Image</Label>
              <FileInput
                id="productImage"
                name="productImage"
                {...register("productImage")}
              />
              <FormError message={errors.productImage?.message} />
            </div>
          </div>
        </div>
        <div className="">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Update Product
          </button>
        </div>
      </div>
    </form>
  );
}
