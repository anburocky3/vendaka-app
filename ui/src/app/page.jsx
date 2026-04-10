"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome to Vendaka! Mr.</h1>
        <p className="text-lg text-gray-700">
          This is a simple app to learn skills. Explore the courses and start
          learning today!
        </p>
      </div>
    </div>
  );
}
