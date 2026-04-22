"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminSidebar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="w-64 bg-gray-900 text-white shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Vendaka</h1>
      </div>

      <nav className="mt-6 space-y-2">
        <Link
          href="/admin/dashboard"
          className="block px-6 py-3 hover:bg-gray-800 rounded-lg transition-colors"
        >
          📊 Dashboard
        </Link>
        <Link
          href="/admin/products"
          className="block px-6 py-3 hover:bg-gray-800 rounded-lg transition-colors"
        >
          📦 Manage Products
        </Link>
        <Link
          href="/admin/orders"
          className="block px-6 py-3 hover:bg-gray-800 rounded-lg transition-colors"
        >
          🛒 Manage Orders
        </Link>
      </nav>

      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-900 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
