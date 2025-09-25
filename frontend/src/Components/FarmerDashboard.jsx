import React, { useState, useEffect } from "react";
import FarmerSidebar from "./FarmerSidebar";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FarmerDashboard = () => {
  const [farmer, setFarmer] = useState(null);
  const [categories, setCategories] = useState([]);
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();

        if (res.ok) {
          setFarmer(data.farmer);
          console.log("Categories from API:", data.categories); // Debug line
          setCategories(data.categories);
          setPendingSubmissions(data.submissions);
          setRecentActivities(data.activities);
        } else {
          console.error("Failed to fetch dashboard:", data.message);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    console.log("Navigating with categoryId:", categoryId);
    navigate(`/category/${categoryId}/tasks`);
  };

  const calculateProgress = (completed, total) =>
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const getProgressColor = (progress) => {
    if (progress === 0) return "bg-gray-300";
    if (progress < 30) return "bg-red-400";
    if (progress < 70) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getButtonContent = (category) => {
    if (category.status === "not-started") {
      return { text: "Start Earning", icon: "🚀", disabled: false };
    } else if (category.completed_tasks === category.total_tasks) {
      return { text: "Completed", icon: "✅", disabled: true };
    } else {
      return {
        text: `Continue Step ${category.current_step}`,
        icon: "▶",
        disabled: false,
      };
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return badges[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // 🔹 Show loading state until API finishes
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        ⏳ Loading your dashboard...
      </div>
    );
  }

  // 🔹 Show error if farmer not loaded
  if (!farmer) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        ❌ Failed to load dashboard
      </div>
    );
  }

  const totalCompletedTasks = categories.reduce(
    (sum, cat) => sum + cat.completed_tasks,
    0
  );
  const totalTasks = categories.reduce((sum, cat) => sum + cat.total_tasks, 0);
  const activeCategoriesCount = categories.filter(
    (cat) => cat.completed_tasks > 0
  ).length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Sidebar */}
      <FarmerSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Right side: header + content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-lg border-b-4 border-green-500 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4">
              {/* Logo Section */}
              <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    FarmEase
                  </h1>
                  <p className="text-sm text-gray-600">
                    Smart Farming Platform
                  </p>
                </div>
              </div>

              {/* User Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                <div className="text-right mb-2 sm:mb-0">
                  <p className="text-lg font-semibold text-gray-900">
                    Welcome, {farmer.name}!
                  </p>
                  <p className="text-sm text-gray-600">
                    📍 {farmer.pincode} | 📞 {farmer.phone}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">⭐</span>
                    <div className="text-center">
                      <p className="font-bold text-lg">{farmer.rewardPoints}</p>
                      <p className="text-xs">Points</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete step-by-step tasks, earn reward points, and master modern
              farming techniques with our gamified learning platform.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Total Tasks */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalCompletedTasks}/{totalTasks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
              </div>
            </div>

            {/* Points Earned */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Points Earned</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {farmer.rewardPoints}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </div>

            {/* Active Categories */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Categories
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {activeCategoriesCount}/{categories.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
            </div>

            {/* Pincode Area */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pincode Area</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {farmer.pincode}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {categories.map((category) => {
              // Debug: Log the entire category object
              console.log("Individual category object:", category);
              
              const progress = calculateProgress(
                category.completedTasks,
                category.totalTasks
              );
              const progressColor = getProgressColor(progress);
              const buttonContent = getButtonContent(category);

              // Try different possible ID fields
              const categoryId = category.id || category.category_id || category.categoryId;
              console.log("Extracted categoryId:", categoryId);

              return (
                <div
                  key={categoryId}
                  className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() =>
                    !buttonContent.disabled && handleCategoryClick(categoryId)
                  }
                >
                  {/* Category Header */}
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-1 inline-block">
                      Last activity: {category.lastActivity}
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Progress
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {category.completedTasks}/{category.totalTasks} steps
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                      <div
                        className={`${progressColor} h-3 rounded-full transition-all duration-500 ease-in-out`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{progress}% Complete</span>
                      <span className="font-semibold text-green-600">
                        +{category.points} Points
                      </span>
                    </div>
                  </div>

                  <button
                    className={`w-full font-semibold py-4 px-4 rounded-xl transition-all duration-200 shadow-md ${
                      buttonContent.disabled
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transform hover:scale-105"
                    }`}
                    disabled={buttonContent.disabled}
                    onClick={() =>
                      !buttonContent.disabled && handleCategoryClick(categoryId)
                    }
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg">{buttonContent.icon}</span>
                      <span>{buttonContent.text}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Two Column Layout for Submissions and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Submission Status */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Submission Status
              </h3>
              {pendingSubmissions.length > 0 ? (
                <div className="space-y-4">
                  {pendingSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {submission.taskTitle}
                        </p>
                        <p className="text-sm text-gray-600">
                          {submission.categoryTitle} • {submission.submittedAt}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(
                          submission.status
                        )}`}
                      >
                        {submission.status === "pending" && "⏳ Pending Review"}
                        {submission.status === "approved" && "✅ Approved"}
                        {submission.status === "rejected" && "❌ Rejected"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No pending submissions</p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📈</span>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-center space-x-3 p-4 ${activity.bgColor} rounded-lg`}
                  >
                    <span className="text-2xl">{activity.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-3">
              Ready to Earn More Points?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Complete tasks, get admin approval, and redeem your points in our
              marketplace for farming products!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white text-green-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                onClick={() => alert("Opening marketplace...")}
              >
                🛒 Visit Marketplace
              </button>
              <button
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-green-600 transition-colors"
                onClick={() => alert("Opening government forms...")}
              >
                📄 Apply for Schemes
              </button>
              <button
                className="bg-yellow-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-yellow-600 transition-colors shadow-lg"
                onClick={() => alert("Opening learning resources...")}
              >
                📚 Learning Resources
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;