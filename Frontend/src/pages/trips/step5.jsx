import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronLeft,
} from "react-icons/fa";

import cityImg from "../../assets/images/paris.svg";
import hotelImg from "../../assets/images/hotel.png";
import activity1 from "../../assets/images/louvre.svg";
import activity2 from "../../assets/images/foodwalk.svg";
import activity3 from "../../assets/images/seine.svg";
import Navbar from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function TripPlanner5() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);

  const trip = {
    destination: "Paris, France",
    region: "Europe",
    dates: "12 Mar 2025 – 20 Mar 2025",
    nightsText: "(8 days, 7 nights)",
    departure: "Departure: 10:00 AM",
    experiences: ["Adventure", "Culture", "Food"],
    hotel: {
      name: "GreenLeaf Hotel",
      badges: ["Eco", "Boutique"],
      guests: "2 guests · Deluxe Room",
      price: "$1,120",
      nights: "/ 7 nights",
      img: hotelImg,
    },
    activities: [
      { title: "Louvre Museum Guided Tour", duration: "3h", img: activity1 },
      { title: "Parisian Food Walk", duration: "2h", img: activity2 },
      { title: "Seine River Cycling", duration: "1.5h", img: activity3 },
    ],
  };

  function handleConfirm() {
    if (!agree) return;
    alert("Booking confirmed (demo). Replace with API call.");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${i <= 5 ? "bg-blue-600" : "bg-gray-200"}`}
                  aria-hidden
                />
                {i < 5 && <div className="w-12 h-1 rounded-full bg-gray-200" />}
              </div>
            ))}
          </div>

          <div className="flex-1">
            <div className="text-sm text-gray-500">Step 5 of 5</div>
            <h1 className="text-xl md:text-2xl font-semibold mt-1">Review Your Trip Plan</h1>
            <p className="text-sm text-gray-500 mt-1">Make sure everything looks perfect before you confirm!</p>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="px-3 py-2 rounded-md border flex items-center gap-2">
              <FaChevronLeft /> Back to Activities
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <article className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-full sm:w-48 h-28 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={cityImg} alt={trip.destination} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  {trip.destination}
                </h2>
                <div className="text-sm text-gray-500 mt-1 flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span className="font-medium">{trip.dates}</span>
                    <span className="text-xs text-blue-600 ml-2">{trip.nightsText}</span>
                  </div>
                  <div className="text-sm text-gray-500 ml-0 sm:ml-4">{trip.departure}</div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {trip.experiences.map((e) => (
                    <span
                      key={e}
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        e === "Adventure" ? "bg-blue-50 text-blue-700" : e === "Culture" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="w-28 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={trip.hotel.img} alt={trip.hotel.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{trip.hotel.name}</h3>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {trip.hotel.badges.map((b) => (
                        <span key={b} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
                          {b}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">{trip.hotel.guests}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">{trip.hotel.price}</div>
                    <div className="text-xs text-gray-400">{trip.hotel.nights}</div>
                    <button className="mt-3 px-3 py-2 rounded-md border text-sm">Change</button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Selected Activities</h3>
              <div className="text-sm text-gray-500">You can edit any item</div>
            </div>

            <ul className="mt-4 space-y-4">
              {trip.activities.map((a, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{a.title}</div>
                      <div className="text-sm text-gray-500">{a.duration}</div>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Guide & entry included</div>
                  </div>

                  <div className="text-sm">
                    <button className="text-blue-600 underline mr-3">Edit</button>
                    <FaChevronLeft className="hidden" />
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">

            <div className="bg-white rounded-2xl p-5 shadow">
              <h4 className="text-sm font-semibold mb-3">Contact Details</h4>

              <label className="block text-xs text-gray-500">Full Name *</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-md text-sm"
                placeholder="Full name"
              />

              <label className="block text-xs text-gray-500 mt-3">Email *</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-md text-sm"
                placeholder="you@company.com"
                type="email"
              />

              <label className="block text-xs text-gray-500 mt-3">Phone (optional)</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-md text-sm"
                placeholder="+1 555 555 555"
                type="tel"
              />

              <label className="block text-xs text-gray-500 mt-3">Special Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-md text-sm h-24 resize-none"
                placeholder="Any dietary restrictions, accessibility needs, etc."
              />

              <label className="inline-flex items-center gap-2 mt-4 text-sm">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="w-4 h-4" />
                <span className="text-sm text-gray-600">I agree to the terms and conditions</span>
              </label>

              <button
                onClick={handleConfirm}
                disabled={!agree}
                className={`mt-4 w-full px-4 py-3 rounded-lg font-semibold ${agree ? "bg-blue-600 text-white shadow" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
              >
                Confirm & Book Trip
              </button>
            </div>
          </div>
        </aside>
      </main>
      <Footer/>
    </div>
  );
}
