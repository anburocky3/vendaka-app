"use client";
import { useAuth } from "@/context/AuthContext";

export default function AdminHeader() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            Welcome,{" "}
            <span className="font-medium">{user.name.split(" ")[0]}</span>
          </span>
          <img
            className="w-10 h-10 rounded-full"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=128`}
            alt="Rounded avatar"
          />
        </div>
      </div>
    </header>
  );
}
