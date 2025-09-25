import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, BookOpen, Award, ShoppingCart, FileText, X, LogOut } from "lucide-react";

const FarmerSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: Home, path: "/farmerdashboard" },
    { id: "learning", name: "Learning Paths", icon: BookOpen, path: "/learning" },
    // { id: "rewards", name: "Rewards", icon: Award, path: "/rewards" },
    { id: "marketplace", name: "Marketplace", icon: ShoppingCart, path: "/marketplace" },
    { id: "applications", name: "Applications", icon: FileText, path: "/applications" },
    { id: "leaderboard", name: "Leaderboard", icon: Award, path: "/leaderboard" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login"); // redirect to login page
  };

  const handleItemClick = (item) => {
    setActiveTab(item.id);
    navigate(item.path); // 👈 navigate to respective path
    setSidebarOpen(false); // close sidebar on mobile
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="text-2xl font-bold text-green-600">🌾 FarmEase</div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="mt-6 px-3 flex flex-col justify-between h-[calc(100%-4rem)]">
        <div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-100 hover:text-red-700 mt-4"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default FarmerSidebar;
