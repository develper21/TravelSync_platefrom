import React from 'react'
import parisImg from '../assets/images/paris.png';
import tokyoImg from '../assets/images/tokyo.png';
import maldivesImg from '../assets/images/maldives.png'; 
const bookings = [
  {
    id: 1,
    title: "Paris, France",
    date: "12 Jun – 20 Jun, 2024",
    status: "Confirmed",
    statusColor: "text-green-600",
    image: parisImg, 
  },
  {
    id: 2,
    title: "Tokyo, Japan",
    date: "5 Jul – 14 Jul, 2024",
    status: "Pending",
    statusColor: "text-yellow-500",
    image: tokyoImg,
  },
  {
    id: 3,
    title: "Maldives",
    date: "22 Apr – 29 Apr, 2024",
    status: "Cancelled",
    statusColor: "text-red-500",
    image: maldivesImg,
  },
];
const Mybookings = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-1">My Bookings</h2>
      <p className="text-gray-500 mb-6">
        View and manage your upcoming and past bookings.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition bg-white"
          >
            <img
              src={booking.image}
              alt={booking.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{booking.title}</h3>
              <p className="text-gray-500 text-sm">{booking.date}</p>
              <p className={`font-medium text-sm ${booking.statusColor}`}>
                {booking.status}
              </p>


              <div className="flex gap-3 mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm">
                  View Details
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 py-2 text-sm">
                  Invoice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mybookings
