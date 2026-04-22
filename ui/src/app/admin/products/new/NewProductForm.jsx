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
import { useRouter } from "next/navigation";

const productSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["electronics", "clothing", "home"]),
  productImage: z
    .any()
    .refine((files) => files?.length > 0, "Product image is required"),
});

export default function NewProductForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("price", String(values.price));
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("productImage", values.productImage[0]);

    console.log("Form Data:", {
      productName: values.productName,
      price: values.price,
      description: values.description,
      category: values.category,
      productImage: values.productImage[0],
    });
    const response = await fetch("/api/admin/products", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    // if created, reset form and show success message and redirect to products list
    if (response.ok) {
      alert("Product created successfully!");
      // reset form
      reset();
      // redirect to products list
      router.push("/admin/products");
    }

    if (!response.ok) {
      throw new Error("Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
      <div className="p-6 space-y-6">
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
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
}
