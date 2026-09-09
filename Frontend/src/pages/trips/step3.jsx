import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaLeaf,
  FaMapMarkerAlt,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { MdSupportAgent } from "react-icons/md";
import api from "../../services/api";

import hotel1 from "../../assets/images/hotel1.png";
import hotel2 from "../../assets/images/hotel2.png";
import hotel3 from "../../assets/images/hotel3.png";
import hotel4 from "../../assets/images/hotel4.png";
import hotel5 from "../../assets/images/hotel5.png";
import hotel6 from "../../assets/images/hotel6.png";
import plannerAvatar from "../../assets/images/team1.png";
import heroPlaceholder from "../../assets/images/heroPlaceholder.png";

const HOTELS = [
  {
    id: 1,
    name: "Green Oasis Resort",
    badges: ["Eco-Friendly", "Luxury"],
    rating: 4.2,
    price: "$180– $350",
    img: hotel1,
  },
  {
    id: 2,
    name: "Urban Stay Inn",
    badges: ["Budget"],
    rating: 3.1,
    price: "$65– $120",
    img: hotel2,
  },
  {
    id: 3,
    name: "Boho Blue Boutique",
    badges: ["Eco-Friendly", "Budget"],
    rating: 4.0,
    price: "$80– $150",
    img: hotel3,
  },
  {
    id: 4,
    name: "Shoreline Palace",
    badges: ["Luxury"],
    rating: 5.0,
    price: "$250– $550",
    img: hotel4,
  },
  {
    id: 5,
    name: "Sunset Family Lodge",
    badges: ["Budget"],
    rating: 3.0,
    price: "$70– $130",
    img: hotel5,
  },
  {
    id: 6,
    name: "Alpine Retreat",
    badges: ["Eco-Friendly", "Luxury"],
    rating: 4.0,
    price: "$220– $400",
    img: hotel6,
  },
];

export default function TripPlanner3() {
  const [filterRating, setFilterRating] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [ecoOnly, setEcoOnly] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelsList, setHotelsList] = useState(HOTELS);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/hotels')
      .then(res => {
        if (res.data?.hotels && res.data.hotels.length > 0) {
          const mapped = res.data.hotels.map((h, i) => ({
            id: h._id,
            name: h.name,
            badges: h.ecoFriendly ? ["Eco-Friendly"] : ["Standard"],
            rating: h.rating || 4.5,
            price: `$${h.price?.min || 150}– $${h.price?.max || 350}`,
            img: h.images?.[0] || [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6][i % 6]
          }));
          setHotelsList(mapped);
        }
      })
      .catch(err => console.warn('Could not load hotels from API:', err));
  }, []);

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleNext = () => {
    if (!selectedHotel) {
      alert("Please select a hotel to continue.");
      return;
    }
    localStorage.setItem('tripHotel', JSON.stringify(selectedHotel));
    navigate('/trip-planner-4');
  };

  const handleBack = () => {
    navigate('/trip-planner-2');
  };

  const visibleHotels = hotelsList.filter((h) => {
    if (ecoOnly && !h.badges.includes("Eco-Friendly")) return false;
    if (filterRating && Number(h.rating) < Number(filterRating)) return false;
    if (filterPrice) {
      const low = Number(h.price.replace(/[^0-9]/g, "").slice(0, 3));
      if (filterPrice === "low" && low > 100) return false;
      if (filterPrice === "med" && (low < 80 || low > 200)) return false;
      if (filterPrice === "high" && low < 200) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "price") {
      const aLow = Number(a.price.replace(/[^0-9]/g, "").slice(0, 3));
      const bLow = Number(b.price.replace(/[^0-9]/g, "").slice(0, 3));
      return aLow - bLow;
    } else {
      return b.rating - a.rating;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                  <FaLeaf className="text-green-500 text-2xl" />
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">
                  Select Your Stay Preferences
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Choose from eco-friendly, budget, or premium hotels
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-gray-600">Filter:</div>

              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="rounded-md border px-3 py-2 text-sm bg-white"
              >
                <option value="">Any rating</option>
                <option value="4">4+ stars</option>
                <option value="3">3+ stars</option>
              </select>

              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="rounded-md border px-3 py-2 text-sm bg-white"
              >
                <option value="">Any price</option>
                <option value="low">Low</option>
                <option value="med">Medium</option>
                <option value="high">High</option>
              </select>

              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={ecoOnly}
                  onChange={(e) => setEcoOnly(e.target.checked)}
                  className="w-4 h-4 rounded border"
                />
                <span>Eco-Friendly</span>
              </label>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-gray-600 mr-2">
                Sort:
              </div>
              <button
                onClick={() => setSortBy("price")}
                className={`px-3 py-2 rounded-md text-sm border ${sortBy === "price" ? "bg-blue-50 border-blue-200" : "bg-white"
                  }`}
              >
                Price
              </button>
              <button
                onClick={() => setSortBy("rating")}
                className={`px-3 py-2 rounded-md text-sm border ${sortBy === "rating"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-white"
                  }`}
              >
                Rating
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {visibleHotels.map((hotel) => (
              <article
                key={hotel.id}
                className={`bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border-2 transition-all ${selectedHotel?.id === hotel.id ? "border-blue-500 ring-2 ring-blue-100" : "border-transparent"
                  }`}
              >
                <div className="h-40 sm:h-44 w-full bg-gray-100">
                  <img
                    src={hotel.img}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaStar className="text-yellow-400" />
                      <span>{hotel.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {hotel.badges.map((b, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-1 rounded-full font-medium ${b.includes("Eco")
                            ? "bg-green-50 text-green-700"
                            : b.includes("Luxury")
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-blue-600">
                        {hotel.price}
                      </div>
                      <div className="text-xs text-gray-500">/night</div>
                    </div>

                    <button
                      onClick={() => handleSelectHotel(hotel)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow transition ${selectedHotel?.id === hotel.id ? "bg-green-600 text-white" : "bg-blue-600 text-white"
                        }`}>
                      {selectedHotel?.id === hotel.id ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 gap-4 bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-md border flex items-center gap-2 hover:bg-gray-50">
                <FaChevronLeft />
                Back
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">Step 3 of 5</div>
              <div className="flex gap-1">
                <span className="w-6 h-1.5 bg-blue-500 rounded-full" />
                <span className="w-6 h-1.5 bg-blue-500 rounded-full" />
                <span className="w-6 h-1.5 bg-blue-500 rounded-full" />
                <span className="w-6 h-1.5 bg-gray-200 rounded-full" />
                <span className="w-6 h-1.5 bg-gray-200 rounded-full" />
              </div>

              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-700 shadow-md">
                Next Step
                <FaChevronRight />
              </button>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  src={plannerAvatar}
                  alt="Planner"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-gray-900">Alex Murphy</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Expert Guide</div>
                </div>
              </div>

              <hr className="my-4 border-gray-50" />

              <h4 className="text-sm font-bold text-gray-900 mb-3">Your Progress</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                  <span className="text-xs text-gray-500">Destination</span>
                  <span className="text-xs font-semibold text-gray-900">Selected ✅</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                  <span className="text-xs text-gray-500">Experience</span>
                  <span className="text-xs font-semibold text-gray-900">Selected ✅</span>
                </div>
                {selectedHotel && (
                  <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg border border-blue-100">
                    <span className="text-xs text-blue-600">Hotel</span>
                    <span className="text-xs font-bold text-blue-700">{selectedHotel.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 shadow-lg text-white">
              <h4 className="font-semibold mb-2">Exclusive Offer!</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Book now and get a complimentary eco-tour in your destination. Limited time only!
              </p>
              <button className="mt-4 w-full bg-white text-blue-600 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition">
                Learn More
              </button>
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
