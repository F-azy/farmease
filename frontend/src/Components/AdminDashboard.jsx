import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalTasks: 0,
    totalCategories: 0,
    totalPoints: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/dashboard-stats", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <div className="text-4xl font-bold text-green-600">{stats.totalFarmers}</div>
            <div className="mt-2 text-gray-600">Total Farmers</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <div className="text-4xl font-bold text-green-600">{stats.totalCategories}</div>
            <div className="mt-2 text-gray-600">Total Categories</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <div className="text-4xl font-bold text-green-600">{stats.totalTasks}</div>
            <div className="mt-2 text-gray-600">Total Tasks</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <div className="text-4xl font-bold text-green-600">{stats.totalPoints}</div>
            <div className="mt-2 text-gray-600">Total Points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
