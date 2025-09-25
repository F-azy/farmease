import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import FarmerSidebar from "./FarmerSidebar";

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);


  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/farmers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setFarmers(data);
    } catch (err) {
      console.error("Error fetching farmers:", err);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/farmers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setSelectedFarmer(data);
    } catch (err) {
      console.error("Error fetching farmer details:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
        <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Farmers Overview
        </h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search farmers by name or phone..."
            className="w-full px-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Farmers Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-green-100 text-green-700">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Pincode</th>
                <th className="px-6 py-3">Progress</th>
                <th className="px-6 py-3">Rewards</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {farmers
                .filter(
                  (f) =>
                    f.full_name.toLowerCase().includes(search.toLowerCase()) ||
                    f.phone.includes(search)
                )
                .map((f) => (
                  <tr key={f.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{f.full_name}</td>
                    <td className="px-6 py-3">{f.phone}</td>
                    <td className="px-6 py-3">{f.pincode}</td>
                    <td className="px-6 py-3">{f.progress}</td>
                    <td className="px-6 py-3">{f.rewards}</td>
                    <td className="px-6 py-3">
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        onClick={() => handleViewDetails(f.id)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Popup Modal */}
        {selectedFarmer && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
              <h2 className="text-xl font-bold mb-4">
                Farmer: {selectedFarmer.full_name}
              </h2>
              <p>
                <strong>📞 Contact:</strong> {selectedFarmer.phone}
              </p>
              <p>
                <strong>📍 Pincode:</strong> {selectedFarmer.pincode}
              </p>
              <p>
                <strong>📊 Progress:</strong> {selectedFarmer.progress}
              </p>
              <p>
                <strong>🏆 Rewards:</strong> {selectedFarmer.rewards}
              </p>

              <button
                className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={() => setSelectedFarmer(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Farmers;
