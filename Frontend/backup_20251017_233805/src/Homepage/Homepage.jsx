import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FaGlobe, FaStar } from "react-icons/fa";
import { FaRoute, FaLeaf, FaHandHoldingHeart, FaHeadset } from "react-icons/fa";
import { FaPlane, FaHotel, FaHiking } from "react-icons/fa";

import santorini from "/santorini.png";
import kyoto from "/kyoto.png";
import banff from "/banff.png";
import marrakech from "/Marrakech.png";
import reykjavik from "/Reykjavik.png";
import capetown from "/Cape Town.png";

const destinations = [
  {
    id: 1,
    image: santorini,
    title: "Santorini, Greece",
    description: "Stunning white-washed villages perched above crystal blue seas.",
    rating: 4.8,
  },
  {
    id: 2,
    image: kyoto,
    title: "Kyoto, Japan",
    description: "Experience timeless temples and blooming cherry blossoms.",
    rating: 4.9,
  },
  {
    id: 3,
    image: banff,
    title: "Banff, Canada",
    description: "Majestic mountains and emerald lakes in a dreamlike landscape.",
    rating: 4.7,
  },
  {
    id: 4,
    image: marrakech,
    title: "Marrakech, Morocco",
    description: "Vivid souks, spicy aromas, and vibrant ancient streets.",
    rating: 4.6,
  },
  {
    id: 5,
    image: reykjavik,
    title: "Reykjavik, Iceland",
    description: "Chase the Northern Lights and soak in geothermal lagoons.",
    rating: 4.8,
  },
  {
    id: 6,
    image: capetown,
    title: "Cape Town, S. Africa",
    description: "A coastal city with iconic mountains and rich culture.",
    rating: 4.7,
  },
];
const features = [
  {
    id: 1,
    icon: <FaRoute className="text-blue-500 text-3xl mb-3" />,
    title: "Smart Trip Planner",
    description: "Personalized itineraries using AI & local insights.",
  },
  {
    id: 2,
    icon: <FaLeaf className="text-green-500 text-3xl mb-3" />,
    title: "Eco-Friendly Hotels",
    description: "Curated stays that care for the planet.",
  },
  {
    id: 3,
    icon: <FaHandHoldingHeart className="text-orange-500 text-3xl mb-3" />,
    title: "Local Experiences",
    description: "Connect with authentic adventures and culture.",
  },
  {
    id: 4,
    icon: <FaHeadset className="text-blue-500 text-3xl mb-3" />,
    title: "24/7 Support",
    description: "We’re here whenever you need us, day or night.",
  },
];
const reviews = [
  {
    id: 1,
    name: "Sophia Jones",
    location: "London, UK",
    image: "/travelers3.png", // manually add your image here
    rating: 5,
    review:
      "TravelSync made planning my honeymoon to Maldives a breeze! Loved the eco options and the support was amazing.",
    color: "text-blue-500 border-blue-500",
  },
  {
    id: 2,
    name: "Liam Patel",
    location: "Mumbai, India",
    image: "/traverlers4.png", // manually add your image here
    rating: 4,
    review:
      "Booking local experiences in Kyoto was so easy and authentic. The itinerary preview was super handy!",
    color: "text-green-500 border-green-500",
  },
  {
    id: 3,
    name: "Mia Chen",
    location: "San Francisco, USA",
    image: "/travelers2.png", // manually add your image here
    rating: 5,
    review:
      "Love the modern design and instant itinerary. The support team was available any time I needed help!",
    color: "text-orange-500 border-orange-500",
  },
  {
    id: 4,
    name: "Daniel Kim",
    location: "Seoul, South Korea",
    image: "/travelers1.png", // manually add your image here
    rating: 5,
    review:
      "One of the smoothest travel booking platforms I’ve ever used. Fast, reliable, and packed with great options!",
    color: "text-purple-500 border-purple-500",
  },
];

const HeroSection = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative w-full h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/herosection.png')" }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3C82F6]/80 via-[#3C82F6]/40 to-transparent"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center leading-snug">
            Explore the World Smarter <br />
            with <span className="text-green-500">TravelSync</span>
          </h1>
          <p className="mt-3 text-center text-sm md:text-base max-w-xl">
            Discover, plan, and book eco-friendly trips with ease. <br />
            Your adventure starts here.
          </p>

          {/* Search Box */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-3 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 w-full max-w-2xl">
            {/* Destination */}
            <div className="flex flex-col items-start text-left">
              <label className="text-xs font-medium text-gray-600">Destination</label>
              <input
                type="text"
                placeholder="Where to?"
                className="mt-1 px-3 py-2 w-36 md:w-40 rounded-md border border-gray-300 text-black focus:outline-none"
              />
            </div>

            {/* Date */}
            <div className="flex flex-col items-start text-left">
              <label className="text-xs font-medium text-gray-600">Date</label>
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="mt-1 px-3 py-2 w-32 md:w-36 rounded-md border border-gray-300 text-black focus:outline-none"
              />
            </div>

            {/* Type */}
            <div className="flex flex-col items-start text-left">
              <label className="text-xs font-medium text-gray-600">Type</label>
              <select className="mt-1 px-3 py-2 w-28 md:w-32 rounded-md border border-gray-300 text-black focus:outline-none">
                <option>Hotel</option>
                <option>Flight</option>
                <option>Car</option>
              </select>
            </div>

            {/* Button */}
            <button className="mt-2 md:mt-5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center text-sm font-medium shadow-md transition">
              <FaGlobe className="mr-2" /> Plan My Trip
            </button>
          </div>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-blue-600 mb-10">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-lg shadow-md overflow-hidden 
    hover:shadow-lg transition duration-300 
    w-full sm:w-72 md:w-80 lg:w-96 mx-auto"
              >
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  {/* Title + Rating in same row */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{place.title}</h3>
                    <div className="flex items-center">
                      <FaStar className="text-orange-500 mr-1 text-sm" />
                      <span className="text-gray-700 font-medium text-sm">
                        {place.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{place.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-green-100 via-blue-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-green-600 mb-12">
            Why TravelSync?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300 flex flex-col items-center"
              >
                {/* Icon top aligned, not centered vertically */}
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4"> {/* <- overall section width */}
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-12">
            Live Trip Preview
          </h2>

          {/* Main container - you can change size with max-w-3xl, max-w-4xl, w-[700px], etc */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 mx-auto max-w-3xl">

            {/* Left side - Trip details */}
            <div className="flex-1 space-y-6">
              {/* Travel */}
              <div className="flex items-start gap-4 relative">
                <div className="flex-shrink-0 relative">
                  <FaPlane className="text-blue-500 text-2xl" />
                  {/* Line */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Travel</h3>
                  <p className="text-gray-600 text-sm">
                    Flight from London to Kyoto, seat 12A, 10:30 AM
                  </p>
                </div>
              </div>

              {/* Stay */}
              <div className="flex items-start gap-4 relative">
                <div className="flex-shrink-0 relative">
                  <FaHotel className="text-green-500 text-2xl" />
                  {/* Line */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Stay</h3>
                  <p className="text-gray-600 text-sm">
                    3 nights at Sakura Eco Hotel, central Kyoto
                  </p>
                </div>
              </div>

              {/* Activities (Last - no line) */}
              <div className="flex items-start gap-4 relative">
                <div className="flex-shrink-0 relative">
                  <FaHiking className="text-orange-500 text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Activities</h3>
                  <p className="text-gray-600 text-sm">
                    Guided cherry blossom walk + tea ceremony experience
                  </p>
                </div>
              </div>
            </div>


            {/* Right side - Image */}
            <div className="flex-1">
              <img
                src="/trip1.png" // manually add your image here
                alt="Trip Preview"
                className="rounded-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-12">
            What Travelers Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                {/* Profile */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className={`w-12 h-12 rounded-full border-2 ${review.color} object-cover`}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center mb-3">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <FaStar key={i} className="text-orange-400" />
                  ))}
                  {Array.from({ length: 5 - review.rating }, (_, i) => (
                    <FaStar key={i} className="text-gray-300" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div
          className="flex flex-col md:flex-row items-center justify-between p-8"
          style={{
            background: "linear-gradient(to right, #3C82F6 0%, #22C55E 100%)",
            borderRadius: "12px", // same rounded shape as screenshot
          }}
        >
          {/* Left Content */}
          <div className="text-white max-w-lg">
            <h2 className="text-2xl font-bold">Get the Best Travel Tips</h2>
            <p className="mt-2 text-sm text-gray-100">
              Sign up to our newsletter for exclusive offers, guides, and
              destination inspiration.
            </p>
          </div>

          {/* Right Input */}
          <form className="mt-4 md:mt-0 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-80 px-4 py-3 rounded-full bg-white text-gray-700 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </form>
        </div>
      </div>
    </section>
      <Footer />
    </>
  );
};

export default HeroSection;
