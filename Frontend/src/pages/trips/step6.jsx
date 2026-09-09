import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaArrowRight, FaPlaneDeparture, FaTicketAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function TripPlanner6() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('lastBooking') || 'null');
    setBookingDetails(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center w-full">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-md animate-bounce">
            <FaCheckCircle size={48} />
          </div>
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-green-700 bg-green-100 px-4 py-1.5 rounded-full">
          Booking Confirmed & Paid
        </span>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-3">
          Pack Your Bags! You're All Set.
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
          Your sustainable vacation has been reserved. All vouchers and confirmations have been synced to your dashboard.
        </p>

        {/* Receipt Card */}
        {bookingDetails && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-xl mx-auto mb-10 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <span className="text-xs text-gray-400 uppercase font-bold">Booking Reference</span>
                <p className="text-lg font-black text-blue-600 tracking-wider">
                  {bookingDetails.bookingReference || 'TS-CONFIRMED'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 uppercase font-bold">Total Paid</span>
                <p className="text-xl font-black text-green-600">
                  ₹{bookingDetails.amount?.toLocaleString() || '25,000'}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Destination:</span>
                <span className="font-bold">{bookingDetails.destination}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Travel Dates:</span>
                <span className="font-semibold">{bookingDetails.dates}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Party Size:</span>
                <span className="font-semibold">{bookingDetails.travelers} Traveler(s)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Payment Status:</span>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Verified Paid
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Next Action Banner */}
        <div className="bg-blue-50 p-6 sm:p-8 rounded-3xl border border-blue-100 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
              <FaPlaneDeparture size={22} />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">Dashboard Sync</div>
              <div className="text-base font-bold text-gray-900">Manage trip & download receipt anytime</div>
            </div>
          </div>

          <Link
            to="/profile?tab=bookings"
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center gap-2 flex-shrink-0"
          >
            View Bookings <FaArrowRight />
          </Link>
        </div>

        {/* Action highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-1">Check Email</h4>
            <p className="text-xs text-gray-500">Hotel vouchers and itinerary check-in instructions sent.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-1">Explore More</h4>
            <p className="text-xs text-gray-500">Save more dream spots to your travel wishlist.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-1">24/7 Concierge</h4>
            <p className="text-xs text-gray-500">Need adjustments? Our support team is always available.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
