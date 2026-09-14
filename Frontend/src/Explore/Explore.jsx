import React, { useState } from "react";
import { MapPin, Star, Search, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
   const navigate = useNavigate(); 
  const [query, setQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // ✅ Pagination state
  const cardsPerPage = 9; // ✅ har page pe 6 cards dikhayenge

  // Dummy destinations (API se bhi aa sakte hai)
  const destinations = [
    "Bali", "Paris", "Dubai", "Maldives", "London", "New York",
    "Singapore", "Tokyo", "Bangkok", "Switzerland", "Rome", "Istanbul"
  ];

  // Input change par filter karo
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredDestinations([]);
    } else {
      const results = destinations.filter((place) =>
        place.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinations(results);
    }
  };

  // === Destination Cards Data ===
  const places = [
    {
      name: "Bali",
      desc: "Island paradise with stunning beaches & vibrant culture.",
      country: "Indonesia",
      rating: 4.8,
      tag: "Eco-Friendly",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756444320/img_aml0pv.png"
    },
    {
      name: "Prague",
      desc: "Fairytale city famous for its bridges and castles.",
      country: "Czech Republic",
      rating: 4.7,
      tag: "Popular",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_1_r03ect.png"
    },
    {
      name: "Swiss Alps",
      desc: "Spectacular peaks for skiing, hiking, and adventures.",
      country: "Switzerland",
      rating: 4.9,
      tag: "Nature",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    },
    {
      name: "Maasai Mara",
      desc: "Epic wildlife safaris with the Great Migration.",
      country: "Kenya",
      rating: 4.6,
      tag: "Adventure",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_3_gu8oqe.png"
    },
    {
      name: "Reykjavik",
      desc: "Chase auroras and relax in geothermal lagoons.",
      country: "Iceland",
      rating: 4.8,
      tag: "Nature",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_4_gdh9wf.png"
    },
    {
      name: "Tokyo",
      desc: "Futuristic city with neon buzz & rich traditions.",
      country: "Japan",
      rating: 4.9,
      tag: "Popular",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_5_knoagx.png"
    },
    {
      name: "Paris",
      desc: "The city of love, lights and history.",
      country: "France",
      rating: 4.9,
      tag: "Romantic",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_4_gdh9wf.png"
    },
    {
      name: "London",
      desc: "Historic landmarks and modern vibes.",
      country: "UK",
      rating: 4.7,
      tag: "Adventure",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_3_gu8oqe.png"
    },
    {
      name: "Dubai",
      desc: "Luxury, skyscrapers, and desert safaris.",
      country: "UAE",
      rating: 4.6,
      tag: "Luxury",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    },
    {
      name: "Dubai",
      desc: "Luxury, skyscrapers, and desert safaris.",
      country: "UAE",
      rating: 4.6,
      tag: "Luxury",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    },
    {
      name: "Dubai",
      desc: "Luxury, skyscrapers, and desert safaris.",
      country: "UAE",
      rating: 4.6,
      tag: "Luxury",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    },
    {
      name: "Dubai",
      desc: "Luxury, skyscrapers, and desert safaris.",
      country: "UAE",
      rating: 4.6,
      tag: "Luxury",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    },
    {
      name: "Dubai",
      desc: "Luxury, skyscrapers, and desert safaris.",
      country: "UAE",
      rating: 4.6,
      tag: "Luxury",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    },
    {
      name: "Dubai",
      desc: "Luxury, skyscrapers, and desert safaris.",
      country: "UAE",
      rating: 4.6,
      tag: "Luxury",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    },
    {
      name: "Dubai",
      desc: "Luxury, skyscrapers, and desert safaris.",
      country: "UAE",
      rating: 4.6,
      tag: "Luxury",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    },
    {
      name: "Dubai",
      desc: "Luxury, skyscrapers, and desert safaris.",
      country: "UAE",
      rating: 4.6,
      tag: "Luxury",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    },
    {
      name: "Dubai",
      desc: "Luxury, skyscrapers, and desert safaris.",
      country: "UAE",
      rating: 4.6,
      tag: "Luxury",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    },
    {
      name: "Dubai",
      desc: "Luxury, skyscrapers, and desert safaris.",
      country: "UAE",
      rating: 4.6,
      tag: "Luxury",
      image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1756445730/img_2_votsmb.png"
    }
  ];

  // === Pagination Logic ===
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = places.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(places.length / cardsPerPage);

  return (
    <div>
      {/* First Div */}
      <div
        className="w-full h-85 py-20 px-4 sm:px-6 lg:px-20"
        style={{
          background:
            "linear-gradient(180deg, #f3f8ff 100%, #e9f3fc 100%, #f7fafc 100% )"
        }}
        
      >
        <h1 className="text-center text-black font-extrabold text-3xl sm:text-4xl md:text-4xl lg:text-6xl leading-snug font-poppins">
          Find Your Perfect
        </h1>
        <h1 className="text-center text-black font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug font-poppins -mt-4">
          Getaway
        </h1>

        <p className="mt-4 text-center text-gray-700 sm:text-lg md:text-xl font-medium font-poppins">
          Explore handpicked destinations across the globe.
        </p>
      </div>

      {/* === First Small Div (Newsletter Box) === */}
     <div className="-mt-7 max-w-6xl mx-auto bg-white shadow-md rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 p-4">
  {/* Left Side: Icon + Text */}
  <div className="flex items-center gap-2">
    <span className="text-blue-600">
      <Mail className="w-6 h-6" />
    </span>
    <p className="font-medium text-gray-700 text-center sm:text-left">
      Get Travel Tips to Your Inbox!
    </p>
  </div>

  {/* Right Side: Input + Button */}
  <div className="flex w-full sm:w-auto gap-2">
    <input
      type="email"
      placeholder="Enter your email"
      className="flex-1 px-3 py-2 border rounded-lg outline-none"
    />
    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 whitespace-nowrap">
      Get Travel Tips
    </button>
  </div>
</div>


      {/* === Second Small Div (Search Box with Suggestions) === */}
<div className="mt-10 max-w-6xl mx-auto bg-white shadow-md rounded-xl flex flex-col sm:flex-row sm:flex-wrap items-center justify-between p-4 gap-4 relative">
  
  {/* Destination Search with Suggestions */}
  <div className="flex-1 min-w-[200px] relative w-full">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      Destination
    </label>
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="e.g. Bali, Paris..."
      className="w-full px-3 py-2 border rounded-lg outline-none"
    />

    {/* Suggestions Dropdown */}
    {filteredDestinations.length > 0 && (
      <ul className="absolute left-0 right-0 bg-white border rounded-lg mt-1 max-h-40 overflow-y-auto shadow-md z-10">
        {filteredDestinations.map((place, index) => (
          <li
            key={index}
            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              setQuery(place);
              setFilteredDestinations([]);
            }}
          >
            {place}
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Date Picker */}
  <div className="flex-1 min-w-[150px] w-full sm:w-auto">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      Date
    </label>
    <input
      type="date"
      className="w-full sm:w-40 px-3 py-2 border rounded-lg outline-none"
    />
  </div>

  {/* Type Dropdown */}
  <div className="flex-1 min-w-[150px] w-full sm:w-auto -ml-57">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      Type
    </label>
    <select className="w-full sm:w-40 px-3 py-2 border rounded-lg outline-none">
      <option>All Types</option>
      <option>Eco-friendly</option>
      <option>Popular</option>
      <option>Nature</option>
    </select>
  </div>

  {/* Search Button */}
  <div className="flex items-end w-full sm:w-auto">
    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center w-full sm:w-auto">
      <Search className="w-5 h-5 mr-2" />
      Search
    </button>
  </div>
</div>


      {/* === Destination Cards Section with Pagination === */}
      <div className="mt-15 max-w-[1190px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {currentCards.map((place, index) => {
          const bgColor = index % 2 === 0 ? "#22C55E" : "#F97316";

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
               onClick={() => navigate("/bookingexplore", { state: { place } })}
            >
              {/* Image Container */}
              <div className="relative">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <span
                  className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: bgColor }}
                >
                  {place.tag}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold mt-2">{place.name}</h3>
                <p className="text-gray-600 text-sm">{place.desc}</p>
                <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {place.country}
                  </span>
                  <span className="flex items-center gap-1 text-orange-500 font-semibold -mt-28">
                    <Star className="w-4 h-4 fill-orange-500 " />
                    {place.rating}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Buttons */}
     <div className="flex justify-center mt-4 mb-10">
  <div className="flex items-center space-x-2 bg-white shadow-md rounded-full px-4 py-2">
    {/* Previous Button */}
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
      className="px-2 py-1 text-gray-500 disabled:opacity-50"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1 rounded-lg ${
          currentPage === i + 1
            ? "bg-blue-100 text-blue-600 font-bold"
            : "text-gray-700"
        }`}
      >
        {i + 1}
      </button>
    ))}

    {/* Next Button */}
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
      className="px-2 py-1 text-gray-500 disabled:opacity-50"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
</div>

    </div>
  );
};

export default Explore;
