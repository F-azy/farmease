import React, { useState, useEffect } from "react";
import FarmerSidebar from "./FarmerSidebar";

const Leaderboard = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/farmers/leaderboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          const text = await res.text(); // fallback to see HTML error
          console.error("Failed to fetch leaderboard:", text);
          setLoading(false);
          return;
        }

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          const sorted = data.farmers.sort((a, b) => b.points - a.points);
          setFarmers(sorted);
        } else {
          const text = await res.text();
          console.error("Unexpected response format:", text);
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [token]);

  const getRankBadge = (rank) => {
    if (rank === 1) return { bg: 'bg-gradient-to-r from-yellow-400 to-yellow-600', text: 'text-white', icon: '👑' };
    if (rank === 2) return { bg: 'bg-gradient-to-r from-gray-300 to-gray-500', text: 'text-white', icon: '🥈' };
    if (rank === 3) return { bg: 'bg-gradient-to-r from-orange-400 to-orange-600', text: 'text-white', icon: '🥉' };
    return { bg: 'bg-gray-100', text: 'text-gray-800', icon: '' };
  };

  const getPointsColor = (rank) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank === 2) return 'text-gray-600';
    if (rank === 3) return 'text-orange-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-xl font-medium text-gray-700">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        
      <div className="p-6">
       
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-6 border border-white/30">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
                  <button 
                onClick={() => window.location.href = '/farmerdashboard'}
                className="text-green-600 hover:text-green-800 mb-4 flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                🏆 Farmers Leaderboard
              </h1>
              <p className="text-gray-600 text-lg mt-2">Top performing farmers in our community</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-50 px-6 py-3 rounded-2xl border-2 border-green-200">
                <span className="text-green-600 font-medium">Total Farmers:</span>
                <span className="font-bold text-green-800 ml-2">{farmers.length}</span>
              </div>
              <div className="bg-yellow-50 px-6 py-3 rounded-2xl border-2 border-yellow-200">
                <span className="text-yellow-600 font-medium">Total Points:</span>
                <span className="font-bold text-yellow-800 ml-2">
                  {farmers.reduce((sum, farmer) => sum + Number(farmer.points), 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {farmers.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-16 border border-white/30 text-center">
            <div className="text-6xl mb-6">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No farmers data available</h3>
            <p className="text-gray-500 text-lg">Check back later to see the leaderboard rankings!</p>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <tr>
                    <th className="px-6 py-5 text-left font-bold text-lg">Rank</th>
                    <th className="px-6 py-5 text-left font-bold text-lg">Farmer</th>
                    <th className="px-6 py-5 text-left font-bold text-lg">Location (Pincode)</th>
                    <th className="px-6 py-5 text-left font-bold text-lg">Categories</th>
                    <th className="px-6 py-5 text-left font-bold text-lg">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {farmers.map((farmer, index) => {
                    const rank = index + 1;
                    const rankBadge = getRankBadge(rank);
                    const isTop3 = rank <= 3;
                    
                    return (
                      <tr 
                        key={farmer.id} 
                        className={`transition-all duration-200 hover:bg-green-50/60 ${
                          isTop3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400' : 
                          index % 2 === 0 ? 'bg-gray-50/80' : 'bg-white/80'
                        }`}
                      >
                        <td className="px-6 py-5">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${rankBadge.bg} ${rankBadge.text} font-bold shadow-md text-lg`}>
                            {rank <= 3 ? rankBadge.icon : rank}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                              {farmer.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-lg font-bold text-gray-900">{farmer.name}</div>
                              <div className="text-sm text-gray-500">Rank #{rank}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">📍</span>
                            <div>
                              <div className="text-lg font-medium text-gray-900">{farmer.pincode}</div>
                              <div className="text-sm text-gray-500">Kerala, India</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">
                            {farmer.categories ? (
                              farmer.categories.split(',').map((category, idx) => (
                                <span 
                                  key={idx}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                                >
                                  {category.trim()}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 italic">No categories</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">🌟</span>
                            <div>
                              <div className={`text-2xl font-bold ${getPointsColor(rank)}`}>
                                {farmer.points.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">Total Points</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Stats */}
        {farmers.length > 0 && (
          <div className="mt-8 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/30">
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                Showing <span className="font-bold text-green-600">{farmers.length}</span> farmers
              </p>
              <div className="mt-4 flex justify-center items-center gap-4 text-sm text-gray-500">
                <span>🌱 Growing together, harvesting success</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;