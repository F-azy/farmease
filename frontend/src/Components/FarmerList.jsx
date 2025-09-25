import React, { useState } from "react";

const FarmersList = () => {
  const [farmers] = useState([
    {
      id: 1,
      name: "Ramesh Kumar",
      location: "Tamil Nadu",
      submissions: [
        {
          task: "Pond Preparation",
          status: "approved",
          date: "2024-02-10",
          image: "/api/placeholder/100/100",
        },
        {
          task: "Fish Stocking",
          status: "pending",
          date: "2024-02-25",
          image: "/api/placeholder/100/100",
        },
      ],
    },
    {
      id: 2,
      name: "Sita Devi",
      location: "Kerala",
      submissions: [
        {
          task: "Soil Testing",
          status: "approved",
          date: "2024-03-01",
          image: "/api/placeholder/100/100",
        },
      ],
    },
  ]);

  const [selectedFarmer, setSelectedFarmer] = useState(null);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        👩‍🌾 Farmers List
      </h1>

      {/* Farmers List */}
      <div className="grid md:grid-cols-2 gap-6">
        {farmers.map((farmer) => (
          <div
            key={farmer.id}
            className="p-6 rounded-xl bg-white shadow-lg border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {farmer.name}
            </h2>
            <p className="text-gray-600">{farmer.location}</p>
            <button
              onClick={() => setSelectedFarmer(farmer)}
              className="mt-4 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Farmer Details */}
      {selectedFarmer && (
        <div className="mt-10 p-6 rounded-xl bg-white shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            📋 {selectedFarmer.name}'s Submissions
          </h2>

          <ul className="space-y-4">
            {selectedFarmer.submissions.map((submission, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg flex items-center gap-4 bg-gray-50"
              >
                <img
                  src={submission.image}
                  alt={submission.task}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {submission.task}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Date: {submission.date}
                  </p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${
                      submission.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FarmersList;
