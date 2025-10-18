<<<<<<< HEAD:Frontend/src/Trip-Planner/step3.jsx
import { useState, useRef, useEffect } from "react";
import {
  Building2,
  Star,
  List,
  ChevronDown,
  ArrowUp,
  ArrowDown as ArrowDownIcon,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";

// A dedicated component for displaying star ratings visually
const StarRating = ({ rating = 0, className = "" }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = totalStars - fullStars;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
      <span className="ml-1 text-sm text-gray-600 font-medium">({rating.toFixed(1)})</span>
    </div>
  );
};

export default function StayPreferences() {
  const [selectedHotel, setSelectedHotel] = useState("Green Oasis Resort");
  
  // State to manage dropdown visibility
  const [ratingFilterOpen, setRatingFilterOpen] = useState(false);
  const [priceFilterOpen, setPriceFilterOpen] = useState(false);

  // Refs for dropdowns to handle outside clicks
  const ratingRef = useRef(null);
  const priceRef = useRef(null);

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (ratingRef.current && !ratingRef.current.contains(event.target)) {
        setRatingFilterOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setPriceFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ratingRef, priceRef]);


  const hotels = [
    {
      name: "Green Oasis Resort",
      tags: ["Eco-Friendly", "Luxury"],
      priceRange: "$180 – $350",
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Urban Stay Inn",
      tags: ["Budget"],
      priceRange: "$65 – $120",
      rating: 3.1,
      image: "https://i.imgur.com/2aLQlA2.png",
    },
    {
      name: "Boho Blue Boutique",
      tags: ["Eco-Friendly", "Budget"],
      priceRange: "$80 – $150",
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Shoreline Palace",
      tags: ["Luxury"],
      priceRange: "$250 – $550",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Sunset Family Lodge",
      tags: ["Budget"],
      priceRange: "$70 – $130",
      rating: 3.0,
      image: "https://images.unsplash.com/photo-1582719478250-c891e47a5a65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1584&q=80",
    },
    {
      name: "Alpine Retreat",
      tags: ["Eco-Friendly", "Luxury"],
      priceRange: "$220 – $400",
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1586611292717-f8284e477185?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-xl mx-auto ml-10"> {/* Increased max-width for more space */}
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-600" />
                Select Your Stay Preferences
            </h1>
            <p className="text-gray-500 mt-2">
                Choose from eco-friendly, budget, or premium hotels
            </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-12"> {/* Increased gap for more space */}
          {/* Left Section - Hotels & Filters */}
          <div className="flex-1">
            {/* Filters & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700">Filter:</span>

                    {/* Rating Dropdown */}
                    <div className="relative" ref={ratingRef}>
                        <button onClick={() => setRatingFilterOpen(!ratingFilterOpen)} className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg bg-white shadow-sm text-sm text-gray-700 hover:bg-gray-100">
                            Rating <ChevronDown className={`w-4 h-4 transition-transform ${ratingFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {ratingFilterOpen && (
                            <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl border z-10">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">★★★★★ (5)</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">★★★★☆ & Up (4+)</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">★★★☆☆ & Up (3+)</a>
                            </div>
                        )}
                    </div>

                    {/* Price Range Dropdown */}
                     <div className="relative" ref={priceRef}>
                        <button onClick={() => setPriceFilterOpen(!priceFilterOpen)} className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg bg-white shadow-sm text-sm text-gray-700 hover:bg-gray-100">
                            Price Range <ChevronDown className={`w-4 h-4 transition-transform ${priceFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {priceFilterOpen && (
                            <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl border z-10">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">$0 - $100</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">$100 - $200</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">$200 - $400</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">$400+</a>
                            </div>
                        )}
                    </div>
                    
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border-green-300 rounded-lg bg-green-100 text-green-800 text-sm font-semibold shadow-sm">
                        <Check className="w-4 h-4" /> Eco-friendly
                    </button>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <span className="font-semibold text-gray-700">Sort:</span>
                    <button className="flex items-center gap-1 text-gray-800 font-medium hover:text-blue-600">Price <ArrowDownIcon className="w-4 h-4" /></button>
                    <button className="flex items-center gap-1 text-gray-800 font-medium hover:text-blue-600">Rating <ArrowUp className="w-4 h-4" /></button>
                </div>
            </div>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div key={hotel.name} className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${selectedHotel === hotel.name ? "border-blue-500" : "border-transparent"}`}>
                  <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover"/>
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800">{hotel.name}</h2>
                    <div className="flex flex-wrap gap-2 my-2">
                      {hotel.tags.map((tag) => (<span key={tag} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tag === "Eco-Friendly" ? "bg-green-100 text-green-800" : tag === "Luxury" ? "bg-yellow-100 text-yellow-800" : "bg-orange-100 text-orange-800"}`}>{tag}</span>))}
                    </div>
                    <StarRating rating={hotel.rating} className="mt-2" />
                    <p className="mt-3 text-gray-700 font-semibold">{hotel.priceRange} <span className="text-gray-500 font-normal">/ night</span></p>
                    <button onClick={() => setSelectedHotel(hotel.name)} className="mt-4 w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">Select</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination & Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"><ChevronLeft className="w-4 h-4" /> Back</button>
            
           <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">Step <b>3</b> of 5</span>
            <div className="w-40 h-2 bg-gray-200 rounded-full mt-2">
              <div className="w-3/5 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
              <button className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
            Next Step →
          </button>
            </div>
          </div>

          {/* Right Section - Trip Summary */}
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
             <div className="bg-white shadow-lg rounded-xl p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4"><List className="w-5 h-5 text-blue-600"/>Your Trip Summary</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="font-semibold text-gray-600">Destination:</span> <span className="text-gray-800">Kyoto, Japan</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-gray-600">Dates:</span> <span className="text-gray-800">12–18 Oct 2025</span></div>
                    <div className="flex justify-between"><span className="font-semibold text-gray-600">Experience:</span> <span className="text-gray-800">Culture & Nature</span></div>
                    <div className="flex justify-between items-center"><span className="font-semibold text-gray-600">Stay:</span> <span className="text-blue-600 font-bold text-base text-right">{selectedHotel}</span></div>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t">
                    <img src="https://i.pravatar.cc/40?u=alexmurphy" alt="Travel Planner Alex Murphy" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="text-sm font-bold text-gray-800">Alex Murphy</p>
                        <p className="text-xs text-gray-500">Travel Planner</p>
                    </div>
                </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
=======
import React, { useState } from "react";
import {
  FaStar,
  FaLeaf,
  FaMapMarkerAlt,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { MdSupportAgent } from "react-icons/md";

import hotel1 from "../assets/images/hotel1.png";
import hotel2 from "../assets/images/hotel2.png";
import hotel3 from "../assets/images/hotel3.png";
import hotel4 from "../assets/images/hotel4.png";
import hotel5 from "../assets/images/hotel5.png";
import hotel6 from "../assets/images/hotel6.png";
import plannerAvatar from "../assets/images/team1.png";
import heroPlaceholder from "../assets/images/heroPlaceholder.png";

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

  const visibleHotels = HOTELS.filter((h) => {
    if (ecoOnly && !h.badges.includes("Eco-Friendly")) return false;
    if (filterRating && Number(h.rating) < Number(filterRating)) return false;
    if (filterPrice) {
      const low = Number(h.price.replace(/[^0-9–\- ]/g, "").split(/[–\-]/)[0]);
      if (filterPrice === "low" && low > 100) return false;
      if (filterPrice === "med" && (low < 80 || low > 200)) return false;
      if (filterPrice === "high" && low < 200) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "price") {
      const aLow = Number(a.price.replace(/[^0-9–\- ]/g, "").split(/[–\-]/)[0]);
      const bLow = Number(b.price.replace(/[^0-9–\- ]/g, "").split(/[–\-]/)[0]);
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
                <img src={heroPlaceholder} alt="" className="hidden" />
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
                aria-label="Filter by rating"
              >
                <option value="">Any rating</option>
                <option value="4">4+ stars</option>
                <option value="3">3+ stars</option>
              </select>

              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="rounded-md border px-3 py-2 text-sm bg-white"
                aria-label="Filter by price"
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
                className={`px-3 py-2 rounded-md text-sm border ${
                  sortBy === "price" ? "bg-blue-50 border-blue-200" : "bg-white"
                }`}
              >
                Price
              </button>
              <button
                onClick={() => setSortBy("rating")}
                className={`px-3 py-2 rounded-md text-sm border ${
                  sortBy === "rating"
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
                className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
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
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          b.includes("Eco")
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

                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow">
                      Select
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M7 5l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-md border flex items-center gap-2">
                <FaChevronLeft />
                Back
              </button>
              <button className="text-sm text-gray-500 underline">
                Skip This Step
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">Step 3 of 5</div>
              <div className="flex gap-2 items-center">
                <span className="w-8 h-2 bg-gray-200 rounded-full" />
                <span className="w-8 h-2 bg-blue-500 rounded-full" />
                <span className="w-8 h-2 bg-gray-200 rounded-full" />
                <span className="w-8 h-2 bg-gray-200 rounded-full" />
                <span className="w-8 h-2 bg-gray-200 rounded-full" />
              </div>

              <button className="px-4 py-2 rounded-md bg-blue-600 text-white flex items-center gap-2">
                Next Step
                <FaChevronRight />
              </button>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow">
              <div className="flex items-center gap-3">
                <img
                  src={plannerAvatar}
                  alt="Planner"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold">Alex Murphy</div>
                  <div className="text-xs text-gray-500">Travel Planner</div>
                </div>
                <div className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                  <MdSupportAgent /> Support
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="text-sm text-gray-600">Your Trip Summary</h4>
              <div className="mt-3 text-sm text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination:</span>
                  <span>Kyoto, Japan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dates:</span>
                  <span>12–18 Oct 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Experience:</span>
                  <span>Culture &amp; Nature</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Stay:</span>
                  <span className="text-blue-600 font-medium">
                    Green Oasis Resort
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow">
              <h4 className="text-sm font-semibold mb-3">Need help?</h4>
              <p className="text-sm text-gray-600">
                Our travel agents are available 24/7 to help you finalize your
                booking.
              </p>
              <button className="mt-4 w-full px-4 py-2 rounded-md bg-blue-600 text-white">
                Contact Support
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow text-sm">
              <div className="font-semibold mb-2">Newsletter</div>
              <div className="flex gap-2">
                <input
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
                <button className="px-3 py-2 rounded-md bg-blue-600 text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
>>>>>>> 5843ee64e9cfb9ff294e0addad2775d7df39d52c:Frontend/backup_20251017_233805/src/Trip-Planner/step3.jsx
