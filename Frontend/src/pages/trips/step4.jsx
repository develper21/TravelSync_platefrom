import React, { useState } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaCamera,
  FaUtensils,
  FaBiking,
  FaHiking,
  FaMusic,
  FaBus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const ACTIVITIES = [
  { id: 1, name: "City Tour", icon: <FaBus />, price: 45, category: "Sightseeing" },
  { id: 2, name: "Food Tasting", icon: <FaUtensils />, price: 60, category: "Food" },
  { id: 3, name: "Bike Rental", icon: <FaBiking />, price: 25, category: "Adventure" },
  { id: 4, name: "Museum Entry", icon: <FaCamera />, price: 30, category: "Cultural" },
  { id: 5, name: "Local Concert", icon: <FaMusic />, price: 55, category: "Cultural" },
  { id: 6, name: "Nature Hike", icon: <FaHiking />, price: 40, category: "Adventure" },
];

export default function TripPlanner4() {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const navigate = useNavigate();

  const toggleActivity = (activity) => {
    if (selectedActivities.find(a => a.id === activity.id)) {
      setSelectedActivities(selectedActivities.filter((a) => a.id !== activity.id));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleNext = () => {
    localStorage.setItem('tripActivities', JSON.stringify(selectedActivities));
    navigate('/trip-planner-5');
  };

  const handleBack = () => {
    navigate('/trip-planner-3');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Activities</h1>
          <p className="text-gray-500 mt-2">Pick the experiences you don't want to miss!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              onClick={() => toggleActivity(activity)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-6 ${selectedActivities.find(a => a.id === activity.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-white bg-white hover:border-gray-200"
                }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl ${selectedActivities.find(a => a.id === activity.id) ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                }`}>
                {activity.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{activity.name}</h3>
                <p className="text-sm text-gray-500">{activity.category}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">${activity.price}</div>
                <div className="text-xs text-gray-400">per person</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-12 bg-white p-6 rounded-2xl shadow-sm border">
          <button
            onClick={handleBack}
            className="px-8 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition">
            ← Back
          </button>

          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold text-gray-400">Step 4 of 5</span>
            <div className="w-48 h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Preview Summary →
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
