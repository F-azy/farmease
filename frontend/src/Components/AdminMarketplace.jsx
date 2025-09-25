import React, { useState } from "react";
import Sidebar from "./Sidebar";

const AdminMarketplace = () => {
  // Example products (can later come from backend API)
  const [products] = useState([
    {
      id: 1,
      name: "Coconut Husk",
      price: "₹50 / unit",
      description: "High quality coconut husk for multiple farming uses.",
      image: "/images/coconut-husk.jpg",
    },
    {
      id: 2,
      name: "Organic Fertilizer",
      price: "₹200 / bag",
      description: "Natural organic fertilizer approved by government.",
      image: "/images/organic.jpg",
    },
    {
      id: 3,
      name: "Irrigation Pipe",
      price: "₹1200 / roll",
      description: "Durable irrigation pipe for efficient water usage.",
      image: "/images/irrigation-pipe.jpg",
    },
    {
      id: 4,
      name: "Farming Tools Set",
      price: "₹800 / set",
      description: "Essential tools for farmers provided by government.",
      image:"/images/tool-set.jpg",
    },
  ]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
          <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          Admin Marketplace – Listed Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain rounded-lg mb-4 bg-gray-100"
              />

              {/* Product Details */}
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-green-600 font-bold mt-2">{item.price}</p>
              <p className="text-sm text-gray-600 mt-2 text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMarketplace;
