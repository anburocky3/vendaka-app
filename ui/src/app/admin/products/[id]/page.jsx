import Link from "next/link";
import UpdateProductForm from "./UpdateProductForm";
import GoBackIcon from "@/components/ui/GoBackIcon";

export default async function UpdateProductPage({ params }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <GoBackIcon href={"/admin/products"} />
          <h1 className="text-3xl font-bold text-gray-900">Update Product</h1>
        </div>
        <Link
          href="/admin/products"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          View Products
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <UpdateProductForm productId={id} />
      </div>
    </div>
  );
}
