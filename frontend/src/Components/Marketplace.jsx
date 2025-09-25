import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import FarmerSidebar from "./FarmerSidebar";

const Marketplace = () => {
  const [userPoints, setUserPoints] = useState(120); // Example farmer points (can fetch from backend later)
   const [activeTab, setActiveTab] = useState("marketplace");
    const [sidebarOpen, setSidebarOpen] = useState(false);

  // Example admin-listed products
  const products = [
    {
      id: 1,
      name: "Coconut Husk",
      description: "High-quality coconut husk for soil enrichment.",
      price: 100,
      image: "/images/coconut-husk.jpg",
    },
    {
      id: 2,
      name: "Organic Fertilizer",
      description: "Eco-friendly fertilizer to improve crop yield.",
      price: 250,
      image: "/images/organic.jpg",
    },
    {
      id: 3,
      name: "Irrigation Pipe",
      description: "Durable irrigation pipe suitable for all crops.",
      price: 500,
      image: "/images/irrigation-pipe.jpg",
    },
    {
      id: 4,
      name: "Seed Pack (Vegetables)",
      description: "Mixed seeds pack including tomato, beans, spinach.",
      price: 150,
      image: "/images/seeds.jpg",
    },
    {
      id: 5,
      name: "Tractor Rental (per day)",
      description: "Government-approved tractor rental service.",
      price: 1000,
      image: "/images/tractor.jpg",
    },
  ];

  // Function to calculate discounted price
  const getDiscountedPrice = (price) => {
    if (userPoints > 200) return Math.floor(price * 0.7); // 30% off
    if (userPoints > 100) return Math.floor(price * 0.85); // 15% off
    return price; // no discount
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
     <FarmerSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8">Marketplace</h1>

        <p className="mb-6 text-lg text-gray-700">
          Welcome Farmer! 
          Use your points to get discounts on farming essentials listed by the Government.
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => {
            const discountedPrice = getDiscountedPrice(item.price);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
              >
            <img
  src={item.image}
  alt={item.name}
  className="w-full h-40 object-contain rounded-lg mb-4 bg-gray-100"
/>
                <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                {/* Price section */}
                <div className="mt-auto">
                  {discountedPrice < item.price ? (
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 line-through">
                        ₹{item.price}
                      </p>
                      <p className="text-lg font-bold text-green-700">
                        ₹{discountedPrice} <span className="text-sm">(after discount)</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-gray-800 mb-3">₹{item.price}</p>
                  )}

                  <button
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    onClick={() => alert(`Purchased ${item.name} successfully!`)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
