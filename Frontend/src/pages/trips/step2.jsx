import React, { useState } from "react";
import {
  FaHiking,
  FaLeaf,
  FaLandmark,
  FaWater,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const experiences = [
  { id: 1, name: "Adventure", icon: <FaHiking size={28} />, color: "text-blue-500", bg: "bg-blue-100" },
  { id: 2, name: "Relaxation", icon: <FaLeaf size={28} />, color: "text-green-500", bg: "bg-green-100" },
  { id: 3, name: "Cultural", icon: <FaLandmark size={28} />, color: "text-orange-500", bg: "bg-orange-100" },
  { id: 4, name: "Nature", icon: <FaWater size={28} />, color: "text-blue-400", bg: "bg-blue-100" },
  { id: 5, name: "Family Friendly", icon: <FaUsers size={28} />, color: "text-green-600", bg: "bg-green-100" },
  { id: 6, name: "Local Food", icon: <FaUtensils size={28} />, color: "text-orange-400", bg: "bg-orange-100" },
];

export default function ExperienceStep() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleSelect = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((item) => item !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  const handleNext = () => {
    localStorage.setItem('tripExperiences', JSON.stringify(selected));
    navigate('/trip-planner-3');
  };

  const handleBack = () => {
    navigate('/trip-planner-1');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              What kind of experience are you looking for?
            </h1>
            <p className="text-gray-500 mt-2">
              Select one or more types of trips you enjoy.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                onClick={() => toggleSelect(exp.name)}
                className={`cursor-pointer border rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md h-48
                ${selected.includes(exp.name) ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-200 bg-white"}`}
              >
                <div className={`${exp.bg} ${exp.color} w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-inner`}>
                  {exp.icon}
                </div>
                <span className="font-semibold text-gray-800 text-lg">{exp.name}</span>
                {selected.includes(exp.name) && (
                  <div className="mt-2 text-blue-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <button
              onClick={handleBack}
              className="px-8 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition flex items-center gap-2">
              ← Back
            </button>

            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold text-gray-400">Step 2 of 5</span>
              <div className="w-48 h-2.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="w-2/5 h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center gap-2">
              Next Step →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
