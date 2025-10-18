import { useLocation } from "react-router-dom";
import {
  MapPin,
  Star,
  CalendarCheck,
  Clock,
  Thermometer,
  Backpack,
} from "lucide-react";
import { ThumbsUp, ThumbsDown, UserCircle } from "lucide-react";
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

const Bookings = () => {
  const location = useLocation();
  const { place } = location.state || {};

  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredReviews =
    filter === "all"
      ? reviewsData
      : reviewsData.filter((r) => r.type === filter);

  const visibleReviews = filteredReviews.slice(0, visibleCount);

  return (
    <div className="w-full">
      {place ? (
        <>
          {/* --------- Top Section: Image + Overlay + Book Button --------- */}
          <div className="relative w-full">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-[650px] object-cover"
            />

            {/* Overlay Details */}
            <div className="absolute bottom-9 left-8 text-white p-4 rounded-xl w-fit">
              <p className="flex items-center text-2xl font-medium mb-2">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                {place.country}
              </p>

              <h1 className="text-4xl font-bold mb-2">{place.name}</h1>

              <p className="flex items-center text-2xl">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                {place.rating}{" "}
                <span className="ml-2 text-gray-200">
                  ({place.views} views)
                </span>
              </p>
            </div>

            {/* Book Button */}
            <button className="absolute bottom-10 right-10 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-5 py-3 rounded-xl shadow-lg transition">
              <CalendarCheck className="w-5 h-5 text-blue-600 fill-white" />
              Book Now
            </button>
          </div>

          {/* --------- Bottom Section: About + Info Boxes --------- */}
          <div className="max-w-6xl mx-auto mt-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Side: About Text */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                About this destination
              </h2>
              <p className="text-gray-700 mb-6">
                Nestled between the sapphire lakes of Thun and Brienz and
                surrounded by the snow-capped peaks of the Swiss Alps,
                Interlaken is a haven for nature lovers and adventure seekers.
                Its breathtaking vistas, charming old-town, and vibrant culture
                make it a must-visit destination for travelers year-round.
              </p>

              <p className="text-gray-700 mb-8">
                Whether you crave adrenaline-pumping activities like skydiving
                and paragliding, or prefer tranquil boat rides and mountain
                hikes, Interlaken offers the perfect blend of thrill and
                serenity. Discover local artisan shops, savor Swiss delicacies,
                and embark on scenic train journeys that unveil the region’s
                stunning beauty.
              </p>

              {/* Tags */}
              <div className="flex gap-3 flex-wrap mb-5">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  🌱 Eco-Friendly
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  🔥 Trending
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  🎯 Adventure Spot
                </span>
              </div>
            </div>

            {/* Right Side: Info Boxes */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="bg-white shadow-md rounded-xl p-3 flex items-start gap-3">
                <Clock className="w-6 h-6 text-blue-500" />
                <div>
                  <h4 className="text-gray-600">Best time to visit</h4>
                  <p className="font-semibold">June – September</p>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-xl p-3 flex items-start gap-3">
                <Thermometer className="w-6 h-6 text-orange-500" />
                <div>
                  <h4 className="text-gray-600">Weather</h4>
                  <p className="font-semibold">10°C – 25°C, Mild & Pleasant</p>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-xl p-3 flex items-start gap-3">
                <Backpack className="w-6 h-6 text-green-500" />
                <div>
                  <h4 className="text-gray-600">Things to carry</h4>
                  <p className="font-semibold">
                    Hiking boots, Light jacket, Adapter
                  </p>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-xl p-3 flex items-start gap-3">
                <CalendarCheck className="w-6 h-6 text-purple-500" />
                <div>
                  <h4 className="text-gray-600">Suggested Duration</h4>
                  <p className="font-semibold">3 – 5 Days</p>
                </div>
              </div>
            </div>
          </div>

          {/* -------- Suggested Itinerary -------- */}
          <div className="max-w-5xl mx-auto mt-16 px-6 mb-10">
            <h2 className="text-3xl font-bold mb-8">Suggested Itinerary</h2>
            <div className="space-y-10 border-l-4 border-gray-200 pl-6">
              {/* Day 1 */}
              <div className="relative ml-8">
                <div className="absolute -left-9 top-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="text-blue-600 font-medium">Day 1</h3>
                <h3 className="text-lg font-bold text-gray-800">
                  Arrival & Hotel Check-in
                </h3>
                <p className="text-gray-600 mb-3">
                  Arrive at Interlaken, transfer to your hotel, and spend the
                  evening strolling through the historic old town.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full shadow-sm">
                    🏨 Hotel
                  </span>
                </div>
              </div>

              {/* Day 2 */}
              <div className="relative ml-8">
                <div className="absolute -left-9 top-1 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="text-green-600 font-medium">Day 2</h3>
                <h3 className="text-lg font-bold text-gray-800">
                  City Tour & Lake Brienz Adventure
                </h3>
                <p className="text-gray-600 mb-3">
                  Explore Interlaken’s attractions, enjoy a boat ride on Lake
                  Brienz, and try local cuisine at lakeside cafes.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full shadow-sm">
                    🌊 Lake
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full shadow-sm">
                    🍴 Food
                  </span>
                </div>
              </div>

              {/* Day 3 */}
              <div className="relative ml-8">
                <div className="absolute -left-9 top-1 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <h3 className="text-orange-600 font-medium">Day 3</h3>
                <h3 className="text-lg font-bold text-gray-800">
                  Leisure & Departure
                </h3>
                <p className="text-gray-600 mb-3">
                  Enjoy a morning mountain hike or relax at a spa. Check out and
                  depart with unforgettable memories.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full shadow-sm">
                    🥾 Hike
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full shadow-sm">
                    🛁 Spa
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* -------- Reviews Section -------- */}
<div className="max-w-6xl mx-auto mt-16 px-6">
  <h2 className="text-3xl font-bold mb-6">Reviews & Ratings</h2>

  {/* Filter Buttons */}
  <div className="flex gap-3 mb-6">
    <button
      onClick={() => {
        setFilter("all");
        setVisibleCount(4);
      }}
      className={`px-4 py-2 rounded-full border ${
        filter === "all"
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700"
      }`}
    >
      All
    </button>
    <button
      onClick={() => {
        setFilter("positive");
        setVisibleCount(4);
      }}
      className={`px-4 py-2 rounded-full border flex items-center gap-2 ${
        filter === "positive"
          ? "bg-green-600 text-white"
          : "bg-white text-gray-700"
      }`}
    >
      <ThumbsUp className="w-4 h-4" /> Positive
    </button>
    <button
      onClick={() => {
        setFilter("negative");
        setVisibleCount(4);
      }}
      className={`px-4 py-2 rounded-full border flex items-center gap-2 ${
        filter === "negative"
          ? "bg-red-600 text-white"
          : "bg-white text-gray-700"
      }`}
    >
      <ThumbsDown className="w-4 h-4" /> Negative
    </button>
  </div>

    {/* Horizontal Scrollable Reviews */}
  <div className="overflow-x-auto no-scrollbar">
    <div className="flex gap-6">
      {visibleReviews.map((review, index) => (
        <div
          key={index}
          className="min-w-[300px] bg-white rounded-2xl shadow-md p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <UserCircle className="w-10 h-10 text-gray-400" />
            <div>
              <h4 className="font-bold text-gray-800">{review.name}</h4>
              <p className="text-sm text-gray-500">{review.country}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm">{review.review}</p>
        </div>
      ))}
    </div>
  </div>


  {/* Write a Review Button */}
  <div className="flex justify-center mt-6">
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md flex items-center gap-2">
      Write a Review ✍️
    </button>
  </div>
</div>

        </>
      ) : (
        <p className="text-center mt-10">
          No place selected. Please go back and click a card.
        </p>
      )}

      
<div className="max-w-6xl mx-auto mt-20 px-6 mb-10">
        <h2 className="text-xl font-bold mb-6">You May Also Like</h2>

        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-6">
            {destinations.map((dest, index) => (
              <div
                key={index}
                className="min-w-[280px] bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="flex items-center text-sm text-gray-500 mb-1">
                    <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                    {dest.location}
                  </p>
                  <h3 className="text-lg font-bold">{dest.name}</h3>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {dest.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full"
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

    </div>



  );
};

export default Bookings;
