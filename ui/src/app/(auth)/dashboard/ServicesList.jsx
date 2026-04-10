"use client";
import { useEffect, useState } from "react";

export default function ServicesList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setServices(data.services);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Services List</h2>
      <ul className="list-disc pl-5">
        {services.map((service, index) => (
          <li key={index} className="text-gray-700">
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}
