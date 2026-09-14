import { useLocation } from "react-router-dom";
import {
  MapPin,
  Star,
  CalendarCheck,
  Clock,
  Thermometer,
  Backpack,
} from "lucide-react";
import {
  ThumbsUp,
  ThumbsDown,
  UserCircle,
  Bed,
  Ship,
  Mountain,
  Utensils,
  Waves,
  Bath,
  Pencil,
} from "lucide-react";

import { useState } from "react";

const reviewsData = [
  {
    name: "Alex Müller",
    country: "Germany",
    rating: 5,
    type: "positive",
    review:
      "Absolutely stunning! The views are breathtaking and the activities were so much fun. Highly recommended for families and solo travelers.",
  },
  {
    name: "Sophie Dubois",
    country: "France",
    rating: 5,
    type: "positive",
    review:
      "Loved the hiking trails and the charming cafes. Would visit again in a heartbeat. The weather was just perfect!",
  },
  {
    name: "David Rossi",
    country: "Italy",
    rating: 4,
    type: "positive",
    review:
      "Great spot for adventure sports. Paragliding was a blast! Would have loved more shopping options.",
  },
  {
    name: "Oscar Lee",
    country: "Singapore",
    rating: 5,
    type: "positive",
    review:
      "Interlaken is magical and full of adventure. The lakes and mountains are picture-perfect!",
  },
  {
    name: "Emma Brown",
    country: "UK",
    rating: 2,
    type: "negative",
    review:
      "Too crowded during peak season. Hard to enjoy the beauty with so many tourists around.",
  },
  {
    name: "Raj Patel",
    country: "India",
    rating: 3,
    type: "negative",
    review:
      "Beautiful views but very expensive! Food and hotels were overpriced.",
  },
  {
    name: "Liu Wei",
    country: "China",
    rating: 5,
    type: "positive",
    review:
      "The train journeys around Interlaken were the highlight of my trip. Truly breathtaking!",
  },
];

const destinations = [
  {
    name: "Lucerne",
    location: "Lucerne, Switzerland",
    image: "https://images.unsplash.com/photo-1548588681-fb63a174ddc7",
    tags: ["Lake", "Historic"],
  },
  {
    name: "Zermatt",
    location: "Zermatt, Switzerland",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
    tags: ["Skiing", "Alps"],
  },
  {
    name: "Geneva",
    location: "Geneva, Switzerland",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
    tags: ["Culture", "Lake"],
  },
];

const bookingsdetail = () => {
  const location = useLocation();
  const { place } = location.state || {};

  const [filter, setFilter] = useState("all");

  const filteredReviews =
    filter === "all"
      ? reviewsData
      : reviewsData.filter((r) => r.type === filter);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {place ? (
        <>
          {/* --------- Top Section: Image + Overlay + Book Button --------- */}
          <div className="relative w-full">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] object-cover"
            />

            {/* Overlay Details */}
            <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-4 sm:left-8 md:left-16 text-white p-4 sm:p-6 rounded-xl w-[90%] sm:w-fit max-w-sm">
              <p className="flex items-center text-lg sm:text-xl md:text-2xl font-medium mb-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                {place.country}
              </p>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight">
                {place.name}
              </h1>

              <p className="flex items-center text-lg sm:text-xl md:text-2xl">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                {place.rating}{" "}
                <span className="ml-2 text-gray-200 text-sm sm:text-base">
                  ({place.views} views)
                </span>
              </p>
            </div>

            {/* Book Button */}
            <button className="absolute bottom-4 sm:bottom-8 md:bottom-10 right-4 sm:right-8 md:right-16 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base md:text-lg font-semibold px-4 sm:px-5 py-2 sm:py-3 rounded-xl shadow-lg transition transform hover:scale-105">
              <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 fill-white" />
              Book Now
            </button>
          </div>

          {/* --------- Bottom Section: About + Info Boxes --------- */}
          <div className="max-w-7xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              {/* Left Side: About Text */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  About this destination
                </h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Nestled between the sapphire lakes of Thun and Brienz and
                  surrounded by the snow-capped peaks of the Swiss Alps,
                  Interlaken is a haven for nature lovers and adventure seekers.
                  Its breathtaking vistas, charming old-town, and vibrant culture
                  make it a must-visit destination for travelers year-round.
                </p>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Whether you crave adrenaline-pumping activities like skydiving
                  and paragliding, or prefer tranquil boat rides and mountain
                  hikes, Interlaken offers the perfect blend of thrill and
                  serenity. Discover local artisan shops, savor Swiss delicacies,
                  and embark on scenic train journeys that unveil the region's
                  stunning beauty.
                </p>

                {/* Tags */}
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                    🌱 Eco-Friendly
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                    🔥 Trending
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-medium">
                    🎯 Adventure Spot
                  </span>
                </div>
              </div>

              {/* Right Side: Info Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white shadow-md rounded-xl p-3 sm:p-4 flex items-start gap-3">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-gray-600 text-sm sm:text-base font-medium truncate">
                      Best time to visit
                    </h4>
                    <p className="font-semibold text-sm sm:text-base">June – September</p>
                  </div>
                </div>

                <div className="bg-white shadow-md rounded-xl p-3 sm:p-4 flex items-start gap-3">
                  <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-gray-600 text-sm sm:text-base font-medium truncate">
                      Weather
                    </h4>
                    <p className="font-semibold text-sm sm:text-base">10°C – 25°C, Mild & Pleasant</p>
                  </div>
                </div>

                <div className="bg-white shadow-md rounded-xl p-3 sm:p-4 flex items-start gap-3">
                  <Backpack className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-gray-600 text-sm sm:text-base font-medium truncate">
                      Things to carry
                    </h4>
                    <p className="font-semibold text-sm sm:text-base">Hiking boots, Light jacket, Adapter</p>
                  </div>
                </div>

                <div className="bg-white shadow-md rounded-xl p-3 sm:p-4 flex items-start gap-3">
                  <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-gray-600 text-sm sm:text-base font-medium truncate">
                      Suggested Duration
                    </h4>
                    <p className="font-semibold text-sm sm:text-base">3 – 5 Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------- Suggested Itinerary -------- */}
          <div className="max-w-4xl mx-auto mt-12 sm:mt-16 px-4 sm:px-6 lg:px-8 mb-10 lg:ml-30 ">
  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center lg:text-left">
    Suggested Itinerary
  </h2>
  
  <div className="space-y-8 sm:space-y-10 border-l-4 border-gray-200 pl-4 sm:pl-6 md:pl-8 lg:ml-8">
    {/* Day 1 */}
    <div className="relative ml-4 sm:ml-8 md:ml-10 lg:ml-12">
      <div className="absolute -left-5 sm:-left-7 md:-left-9 lg:-left-11 top-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
        <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
      </div>
      <h3 className="text-blue-600 font-medium text-sm sm:text-base">Day 1</h3>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-1">
        Arrival & Hotel Check-in
      </h3>
      <p className="text-gray-600 text-sm sm:text-base mb-3 mt-2 leading-relaxed">
        Arrive at Interlaken, transfer to your hotel, and spend the evening strolling through the historic old town.
      </p>
      <div className="flex gap-2 flex-wrap">
        <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 text-xs sm:text-sm font-medium rounded-full shadow-sm">
          <Bed className="w-3 h-3 sm:w-4 sm:h-4" /> Hotel
        </span>
      </div>
    </div>

    {/* Day 2 */}
    <div className="relative ml-4 sm:ml-8 md:ml-10 lg:ml-12">
      <div className="absolute -left-5 sm:-left-7 md:-left-9 lg:-left-11 top-1 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
        <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
      </div>
      <h3 className="text-green-600 font-medium text-sm sm:text-base">Day 2</h3>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-1">
        City Tour & Lake Brienz Adventure
      </h3>
      <p className="text-gray-600 text-sm sm:text-base mb-3 mt-2 leading-relaxed">
        Explore Interlaken's attractions, enjoy a boat ride on Lake Brienz, and try local cuisine at lakeside cafes.
      </p>
      <div className="flex gap-2 flex-wrap">
        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 text-xs sm:text-sm font-medium rounded-full shadow-sm">
          <Waves className="w-3 h-3 sm:w-4 sm:h-4" /> Lake
        </span>
        <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 text-xs sm:text-sm font-medium rounded-full shadow-sm">
          <Utensils className="w-3 h-3 sm:w-4 sm:h-4" /> Food
        </span>
      </div>
    </div>

    {/* Day 3 */}
    <div className="relative ml-4 sm:ml-8 md:ml-10 lg:ml-12">
      <div className="absolute -left-5 sm:-left-7 md:-left-9 lg:-left-11 top-1 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
        <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
      </div>
      <h3 className="text-orange-600 font-medium text-sm sm:text-base">Day 3</h3>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-1">
        Leisure & Departure
      </h3>
      <p className="text-gray-600 text-sm sm:text-base mb-3 mt-2 leading-relaxed">
        Enjoy a morning mountain hike or relax at a spa. Check out and depart with unforgettable memories.
      </p>
      <div className="flex gap-2 flex-wrap">
        <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 text-xs sm:text-sm font-medium rounded-full shadow-sm">
          <Mountain className="w-3 h-3 sm:w-4 sm:h-4" /> Hike
        </span>
        <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 text-xs sm:text-sm font-medium rounded-full shadow-sm">
          <Bath className="w-3 h-3 sm:w-4 sm:h-4" /> Spa
        </span>
      </div>
    </div>
  </div>
</div>
          {/* -------- Reviews Section -------- */}
          <div className="max-w-7xl mx-auto mt-12 sm:mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8 mb-12">
            {/* Heading + Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Reviews & Ratings</h2>

              <div className="flex gap-2 sm:gap-3 flex-wrap justify-center sm:justify-end">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 sm:px-4 py-2 rounded-full border font-medium text-sm sm:text-base transition-colors ${
                    filter === "all"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("positive")}
                  className={`px-3 sm:px-4 py-2 rounded-full border font-medium text-sm sm:text-base transition-colors ${
                    filter === "positive"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Positive
                </button>
                <button
                  onClick={() => setFilter("negative")}
                  className={`px-3 sm:px-4 py-2 rounded-full border font-medium text-sm sm:text-base transition-colors ${
                    filter === "negative"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Negative
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Reviews */}
            <div className="overflow-x-auto no-scrollbar pb-4">
              <div className="flex gap-4 sm:gap-6">
                {filteredReviews.map((review, index) => (
                  <div
                    key={index}
                    className="min-w-[280px] sm:min-w-[300px] bg-white rounded-2xl shadow-md p-4 sm:p-5 flex-shrink-0"
                  >
                    <div className="flex items-start gap-3 mb-3 sm:mb-4">
                      <UserCircle className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base truncate">
                          {review.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                          {review.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2 sm:mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {review.review}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Write a Review Button */}
            <div className="flex justify-center sm:justify-end mt-6 sm:mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium shadow-md flex items-center gap-2 text-sm sm:text-base transition-colors transform hover:scale-105">
                Write a Review
                <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* -------- You May Also Like Section -------- */}
          <div className="max-w-7xl mx-auto mt-12 sm:mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
              You May Also Like
            </h2>

            <div className="overflow-x-auto no-scrollbar pb-4">
              <div className="flex gap-4 sm:gap-6">
                {destinations.map((dest, index) => (
                  <div
                    key={index}
                    className="min-w-[260px] sm:min-w-[280px] bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                    <div className="p-3 sm:p-4">
                      <p className="flex items-center text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-500 flex-shrink-0" />
                        <span className="truncate">{dest.location}</span>
                      </p>
                      <h3 className="text-base sm:text-lg font-bold mb-2 truncate">
                        {dest.name}
                      </h3>
                      <div className="flex gap-1 sm:gap-2 mt-2 flex-wrap">
                        {dest.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh] px-4">
          <p className="text-center text-gray-600 text-lg">
            No place selected. Please go back and click a card.
          </p>
        </div>
      )}
    </div>
  );
};

export default bookingsdetail;