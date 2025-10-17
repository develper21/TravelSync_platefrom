import React from "react";
import baliImg from "../../assets/images/bali.png";
import parisImg from "../../assets/images/paris.png";
import tokyoImg from "../../assets/images/tokyo.png";
import Navbar from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function TripPlanner6() {
  const bookings = [
    {
      id: 1,
      image: baliImg,
      place: "Bali, Indonesia",
      status: "Upcoming",
      dates: "16 Apr – 22 Apr 2025",
      hotel: "Oceanic Resort",
      tags: ["Beach", "Nature"],
      price: "$1,220",
    },
    {
      id: 2,
      image: parisImg,
      place: "Paris, France",
      status: "Completed",
      dates: "10 Jan – 15 Jan 2024",
      hotel: "Eiffel Inn",
      tags: ["Food", "Culture"],
      price: "$1,060",
    },
    {
      id: 3,
      image: tokyoImg,
      place: "Tokyo, Japan",
      status: "Cancelled",
      dates: "30 Mar – 6 Apr 2024",
      hotel: "Sakura Stay",
      tags: ["Sightseeing"],
      price: "$890",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar/>

      {/* Page header */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-500">View and manage your upcoming and past trips</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium">Upcoming</button>
            <button className="px-4 py-2 rounded-full border border-blue-600 text-blue-600">Past</button>
            <button className="px-4 py-2 rounded-full border text-gray-500">Cancelled</button>
          </div>

          <div className="w-full md:w-96">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <input
                id="search"
                placeholder="Search by destination or date"
                className="w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bookings list */}
        <div className="grid gap-6">
          {bookings.map((b) => (
            <article key={b.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-56 h-44 md:h-auto bg-gray-100 flex-shrink-0">
                <img src={b.image} alt={b.place} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{b.place}</h3>
                      <div className="mt-2 text-sm text-gray-500">{b.dates}</div>
                      <div className="mt-2 text-sm text-gray-500">{b.hotel}</div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        b.status === 'Upcoming' ? 'bg-blue-50 text-blue-700' : b.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>{b.status}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {b.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-lg font-bold text-blue-600">{b.price}</div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">View Details</button>
                    {b.status === 'Upcoming' && (
                      <button className="px-4 py-2 rounded-lg border border-red-300 text-red-600">Cancel Booking</button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination / empty state area (optional) */}
        <div className="mt-8 flex items-center justify-center text-sm text-gray-500">Showing {bookings.length} bookings</div>
      </main>
      <Footer/>
    </div>
  );
}
