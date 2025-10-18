import React, { useState } from "react";
import {
  FaHiking,
  FaLeaf,
  FaLandmark,
  FaWater,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
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

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          What kind of experience are you looking for?
        </h1>
        <p className="text-gray-500 mt-1">
          Select one or more types of trips you enjoy.
        </p>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              onClick={() => toggleSelect(exp.id)}
              className={`cursor-pointer border rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md
                ${selected.includes(exp.id) ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
            >
              <div className={`${exp.bg} ${exp.color} w-14 h-14 flex items-center justify-center rounded-full mb-3`}>
                {exp.icon}
              </div>
              <span className="font-medium text-gray-800">{exp.name}</span>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
            ← Back
          </button>

          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">Step <b>2</b> of 5</span>
            <div className="w-40 h-2 bg-gray-200 rounded-full mt-2">
              <div className="w-2/5 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>

          <button className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
            Next Step →
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
