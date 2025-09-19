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