import React from 'react'
import baliImg from '../assets/images/bali.png';
import santoriniImg from '../assets/images/santorini.png';
import kyotoImg from '../assets/images/kyoto.png';
const destinations = [
  {
    id: 1,
    title: "Ubud, Bali",
    location: "Indonesia",
    tags: ["Nature", "Adventure", "Culture"],
    rating: 4,
    image: baliImg,
  },
  {
    id: 2,
    title: "Santorini",
    location: "Greece",
    tags: ["Beach", "Romantic"],
    rating: 5,
    image: santoriniImg,
  },
  {
    id: 3,
    title: "Kyoto",
    location: "Japan",
    tags: ["Culture", "Historic"],
    rating: 4,
    image: kyotoImg,
  },
];


// Component to show rating stars
const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating}.0)</span>
    </div>
  );
};
const SavedDestinations = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-1">Saved Destinations</h2>
      <p className="text-gray-500 mb-6">Your curated list of places to visit.</p>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((place) => (
          <div
            key={place.id}
            className="shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition bg-white"
          >
            <img
              src={place.image}
              alt={place.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{place.title}</h3>
                <span className="inline-block text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  📍 {place.location}
                </span>
              </div>


              <div className="flex flex-wrap gap-2 mt-3">
                {place.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 px-2 py-1 rounded-full text-green-600 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>


              <div className="mt-3">
                <RatingStars rating={place.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedDestinations
