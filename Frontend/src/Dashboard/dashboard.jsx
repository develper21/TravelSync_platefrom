import React, { useState } from "react";
import {
  FaBook,
  FaHeart,
  FaHistory,
  FaUser,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";

// Import Components
import MyBookings from "../Bookings/Mybookings";
import SavedDestinations from "../SavedDestinations/SavedDestinations";
import TripHistory from "../TripHistory/TripHistory";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import PaymentMethods from "../PaymentMethods/PaymentMethods";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return <MyBookings />;
      case "saved":
        return <SavedDestinations />;
      case "history":
        return <TripHistory />;
      case "profile":
        return <ProfileSettings />;
      case "payment":
        return <PaymentMethods />;
      default:
        return <MyBookings />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <aside className="w-64 bg-blue-50 p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-3">
          <li
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
              activeTab === "bookings"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            <FaBook /> My Bookings
          </li>
          <li
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
              activeTab === "saved"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            <FaHeart /> Saved Destinations
          </li>
          <li
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
              activeTab === "history"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("history")}
          >
            <FaHistory /> Trip History
          </li>
          <li
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
              activeTab === "profile"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser /> Profile Settings
          </li>
          <li
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
              activeTab === "payment"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            <FaCreditCard /> Payment Methods
          </li>
          <li className="flex items-center gap-2 p-2 rounded-md cursor-pointer text-red-500 hover:bg-red-100">
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      {/* Right Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
