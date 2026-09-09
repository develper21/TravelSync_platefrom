import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function TripPlanner5() {
  const [tripData, setTripData] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('tripData') || '{}');
    const exp = JSON.parse(localStorage.getItem('tripExperiences') || '[]');
    const hot = JSON.parse(localStorage.getItem('tripHotel') || 'null');
    const act = JSON.parse(localStorage.getItem('tripActivities') || '[]');

    setTripData(data);
    setExperiences(exp);
    setHotel(hot);
    setActivities(act);
  }, []);

  // Compute realistic pricing
  const nights = 7;
  const hotelRate = hotel ? (parseInt(hotel.price.replace(/[^0-9]/g, "")) || 150) : 150;
  const hotelTotal = hotelRate * nights;
  const activitiesTotal = activities.reduce((sum, a) => sum + (Number(a.price) || 50), 0);
  const subtotal = (hotelTotal + activitiesTotal) * (tripData?.travelers || 1);
  const taxes = Math.round(subtotal * 0.12);
  const grandTotal = subtotal + taxes;

  async function handleConfirm() {
    if (!agree) return;
    setLoading(true);
    try {
      // 1. Create Trip Record
      const tripPayload = {
        title: `Adventure to ${tripData.destination}`,
        destination: tripData.destination,
        startDate: tripData.startDate || new Date(),
        endDate: tripData.endDate || new Date(Date.now() + 7 * 86400000),
        travelers: tripData.travelers || 1,
        budget: grandTotal,
        estimatedCost: grandTotal,
        selectedHotel: hotel ? { name: hotel.name, price: hotel.price } : null,
        selectedActivities: activities,
        activities: activities.map(a => ({ activity: a.name, price: a.price })),
        status: 'confirmed'
      };

      const tripRes = await api.post('/trips', tripPayload);
      const createdTrip = tripRes.data;

      // 2. Create Booking Record
      const bookingPayload = {
        tripId: createdTrip._id,
        type: 'package',
        title: `Vacation Package: ${tripData.destination}`,
        location: tripData.destination,
        price: grandTotal,
        amount: grandTotal,
        status: 'confirmed',
        paymentStatus: 'Paid',
        paymentMethod: 'Credit Card',
        details: {
          hotel: hotel?.name,
          activitiesCount: activities.length,
          travelers: tripData.travelers || 1
        }
      };

      const bookingRes = await api.post('/bookings', bookingPayload);
      const createdBooking = bookingRes.data;

      // 3. Create Payment Receipt
      await api.post('/payments', {
        tripId: createdTrip._id,
        bookingId: createdBooking._id,
        amount: grandTotal,
        status: 'completed'
      });

      // Save receipt in localStorage for confirmation screen
      localStorage.setItem('lastBooking', JSON.stringify({
        bookingReference: createdBooking.bookingReference,
        destination: tripData.destination,
        amount: grandTotal,
        travelers: tripData.travelers || 1,
        dates: `${new Date(tripData.startDate).toLocaleDateString()} - ${new Date(tripData.endDate).toLocaleDateString()}`
      }));

      // Clear draft wizard data
      localStorage.removeItem('tripData');
      localStorage.removeItem('tripExperiences');
      localStorage.removeItem('tripHotel');
      localStorage.removeItem('tripActivities');

      navigate('/trip-planner-6'); // Success page
    } catch (error) {
      console.error('Booking failed:', error);
      alert(error.response?.data?.error || "Failed to confirm booking. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!tripData || !tripData.destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Navbar />
        <div className="p-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800">No active trip found</h2>
          <p className="text-gray-500 mt-2 mb-6">Please start from Step 1 to plan your vacation.</p>
          <button
            onClick={() => navigate('/trip-planner-1')}
            className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl"
          >
            Start Planner
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
            Step 5 of 5
          </span>
          <h1 className="text-4xl font-black text-gray-900 mt-3 mb-2">Review & Confirm Your Journey</h1>
          <p className="text-gray-500 text-base">Almost there! Review your itinerary details and confirm booking.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Destination Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{tripData.destination}</h2>
                    <p className="text-gray-500 text-sm">Selected Destination</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">Dates</div>
                    <div className="text-sm font-semibold flex items-center gap-2 text-gray-800">
                      <FaCalendarAlt className="text-blue-500" />
                      {new Date(tripData.startDate).toLocaleDateString()} - {new Date(tripData.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">Travelers</div>
                    <div className="text-sm font-semibold text-gray-800">{tripData.travelers} Persons</div>
                  </div>
                </div>

                {experiences.length > 0 && (
                  <div className="mt-6">
                    <div className="text-xs text-gray-400 font-bold uppercase mb-2">Trip Vibes & Interests</div>
                    <div className="flex flex-wrap gap-2">
                      {experiences.map(e => (
                        <span key={e} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hotel Card */}
            {hotel && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4 text-gray-900">Accommodation</h3>
                <div className="flex gap-6 items-center">
                  <img src={hotel.img || '/images/bali.png'} className="w-32 h-24 rounded-2xl object-cover" alt={hotel.name} />
                  <div>
                    <h4 className="font-bold text-xl text-gray-900">{hotel.name}</h4>
                    <p className="text-gray-500 text-sm">Eco-Friendly Verified Stay</p>
                    <div className="text-blue-600 font-bold mt-1">{hotel.price} <span className="text-xs text-gray-400">/ night</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* Activities Card */}
            {activities.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4 text-gray-900">Curated Activities</h3>
                <div className="space-y-3">
                  {activities.map(a => (
                    <div key={a.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-800">{a.name}</span>
                      <span className="text-blue-600 font-bold">₹{a.price || 2500}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Confirm */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-50 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Price Breakdown</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Accommodation & Trips</span>
                  <span className="font-bold text-gray-800">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Eco-Taxes & Platform Fees</span>
                  <span className="font-bold text-gray-800">₹{taxes.toLocaleString()}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-lg items-baseline">
                  <span className="font-bold text-gray-900">Total Due</span>
                  <span className="text-2xl font-black text-green-600">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={e => setAgree(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-600 leading-snug">
                    I agree to the <span className="text-blue-600 font-bold underline">Terms of Service</span> and authorize booking payment.
                  </span>
                </label>
              </div>

              <button
                onClick={handleConfirm}
                disabled={!agree || loading}
                className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                  agree && !loading
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Confirming & Reserving..." : "Confirm & Pay"}
                {!loading && <FaCheckCircle />}
              </button>

              <button
                onClick={() => navigate('/trip-planner-4')}
                className="w-full mt-4 py-2 text-gray-400 text-xs font-semibold hover:text-gray-600 flex items-center justify-center gap-1"
              >
                <FaChevronLeft size={10} /> Edit Itinerary
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
