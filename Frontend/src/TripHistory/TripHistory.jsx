import React from 'react'
import { FaCalendarAlt, FaHotel, FaStar } from "react-icons/fa";
import romeImg from '../assets/images/rome.png';
import tokyoImg from '../assets/images/tokyo.png';
import capeTownImg from '../assets/images/cape-town.png';

const trips = [
  {
    id: 1,
    title: "Rome, Italy",
    tags: ["Adventure", "Solo"],
    date: "Jan 4–9, 2025",
    hotel: "Hotel de Russie",
    description:
      "Wandering through ancient ruins and savoring gelato at sunset. Unforgettable!",
    rating: 4,
    image: romeImg, 
  },
  {
    id: 2,
    title: "Tokyo, Japan",
    tags: ["Family"],
    date: "Dec 20–27, 2024",
    hotel: "Park Hyatt Tokyo",
    description:
      "Cherry blossoms, sushi, and city lights — the kids loved every minute!",
    rating: 5,
    image: tokyoImg,
  },
  {
    id: 3,
    title: "Cape Town, South Africa",
    tags: ["Adventure", "Solo"],
    date: "Aug 13–19, 2024",
    hotel: "One&Only Cape Town",
    description:
      "Table Mountain hikes, penguins at Boulders Beach, and wine tours. Pure bliss!",
    rating: 4,
    image: capeTownImg,
  },
];
const RatingStars = ({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className={i < rating ? "text-orange-400" : "text-gray-300"} />
    ))}
    <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
  </div>
);
const TripHistory = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-1">Trip History</h2>
      <p className="text-gray-500 mb-6">
        Relive your past adventures or plan them again.
      </p>


      <div className="flex flex-col gap-6 border-l-2 border-blue-200 pl-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="flex gap-4 shadow-md rounded-2xl bg-white hover:shadow-lg transition p-4"
          >
            <img
              src={trip.image}
              alt={trip.title}
              className="w-28 h-28 object-cover rounded-xl"
            />


            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{trip.title}</h3>
                <div className="flex gap-2">
                  {trip.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>


              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FaCalendarAlt className="text-blue-500" />
                <span>{trip.date}</span>
              </div>


              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FaHotel className="text-blue-500" />
                <span>{trip.hotel}</span>
              </div>


              <p className="text-sm text-gray-700 mt-2">{trip.description}</p>


              <div className="mt-2">
                <RatingStars rating={trip.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TripHistory
