import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, CheckCircle, Package, FileText, TrendingUp, X, LogOut } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/admindashboard", name: "Dashboard", icon: TrendingUp },
    { path: "/farmers", name: "Farmers", icon: Users },
    { path: "/tasksapproval", name: "Task Approvals", icon: CheckCircle },
    { path: "/adminmarketplace", name: "Admin Marketplace", icon: Package },
    { path: "/applicationsmanagement", name: "Applications", icon: FileText },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token on logout
    navigate("/admin-login"); // redirect to admin login page
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="text-2xl font-bold text-green-600">🌾 FarmConnect</div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Nav */}
      <nav className="mt-6 px-3 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-1 ${
              location.pathname === item.path
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="px-3 mb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
