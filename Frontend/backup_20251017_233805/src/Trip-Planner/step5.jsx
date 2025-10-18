<<<<<<< HEAD:Frontend/src/Trip-Planner/step5.jsx
import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Tag,
  Hotel,
  CheckSquare,
  Landmark,
  Utensils,
  Bike,
  ArrowLeft,
  Send ,
  Menu,
  Clock,
  ChevronRight,
} from 'lucide-react'; // Modern icons from Lucide React

const IconWrapper = ({ className, children }) => (
  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${className}`}>
    {children}
  </div>
);

// Progress stepper component
const ProgressStepper = () => {
  return (
    <div className='flex flex-col items-end'>
      <div className="flex items-center space-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <React.Fragment key={index}>
            <div className={`w-2 h-2 rounded-full ${index < 5 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            {index < 4 && <div className="w-6 h-0.5 bg-blue-600"></div>}
          </React.Fragment>
        ))}
      </div>
      <span className="text-sm font-medium text-blue-600 mt-2">Step 5 of 5</span>
    </div>
  );
};

const Step5 = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Menu className="text-gray-800 w-7 h-7" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Review Your Trip Plan</h1>
                <p className="text-gray-500 mt-1">Make sure everything looks perfect before you confirm!</p>
              </div>
            </div>
            <div className='hidden sm:block'>
              <ProgressStepper />
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Trip Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">

              <div className="flex items-center space-x-4">
                <IconWrapper className="bg-blue-100 text-blue-600">
                  <MapPin size={20} />
                </IconWrapper>
                <div>
                  <h2 className="font-bold text-lg text-gray-900">Paris, France 🥐</h2>
                  <p className="text-gray-500 text-sm">Europe</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <IconWrapper className="bg-green-100 text-green-600">
                  <Calendar size={20} />
                </IconWrapper>
                <div>
                  <h3 className="font-semibold text-gray-800">12 Mar 2025 – 20 Mar 2025 <span className="text-blue-600 font-medium text-sm">(8 days, 7 nights)</span></h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Clock size={16} className="mr-1" />
                    <span>Departure: 10:00 AM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <IconWrapper className="bg-orange-100 text-orange-500">
                  <Tag size={20} />
                </IconWrapper>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Experience Type</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Adventure</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Culture</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Food</span>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200" />

              <div className="flex items-start space-x-4">
                <IconWrapper className="bg-blue-100 text-blue-600">
                  <Hotel size={20} />
                </IconWrapper>
                <div className="flex-grow flex flex-col sm:flex-row gap-4">
                  <img src="https://placehold.co/300x300/E2E8F0/4A5568?text=Hotel" alt="Hotel" className="w-full sm:w-32 h-32 object-cover rounded-lg" />
                  <div className="flex-grow flex flex-col">
                    <h4 className="font-bold text-lg text-gray-900">GreenLeaf Hotel</h4>
                    <div className="flex items-center gap-2 my-1">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Eco</span>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">Boutique</span>
                    </div>
                    <p className="text-gray-500 text-sm">2 guests · Deluxe Room</p>
                    <div className="mt-auto flex justify-between items-end pt-2">
                      <p className="font-bold text-blue-600 text-lg">$1,120 <span className="text-sm font-normal text-gray-500">/ 7 nights</span></p>
                      <button className="px-4 py-1.5 border-2 border-blue-500 text-blue-500 rounded-lg text-sm font-semibold hover:bg-blue-50 transition">Change</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <IconWrapper className="bg-green-100 text-green-600">
                  <CheckSquare size={20} />
                </IconWrapper>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Selected Activities</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Landmark size={20} /><span className="text-gray-700">Louvre Museum Guided Tour</span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                      <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">Edit</a>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Utensils size={20} /><span className="text-gray-700">Parisian Food Walk</span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                      <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">Edit</a>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Bike size={20} /><span className="text-gray-700">Seine River Cycling</span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                      <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">Edit</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Details</h2>
              <form className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" id="fullName" className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" id="email" className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (optional)</label>
                  <input type="tel" id="phone" className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Special Notes (optional)</label>
                  <textarea id="notes" rows="4" className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Footer Buttons */}
        <footer className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button className="flex items-center space-x-2 px-5 py-2.5 border border-gray-300 bg-white rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition shadow-sm order-2 sm:order-1">
            <ArrowLeft size={20} />
            <span>Back to Activities</span>
          </button>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4 order-1 sm:order-2">
            <div className="flex items-center">
              <input id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I agree to the <a href="#" className='text-blue-600 font-medium'>terms and conditions</a></label>
            </div>
            <button disabled={!agreed} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed shadow-lg shadow-blue-500/50">
  Confirm & Book Trip <Send size={20} />
</button>

          </div>
        </footer>
      </div>
    </div>
  );
};

export default Step5;
=======
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronLeft,
} from "react-icons/fa";

import cityImg from "../assets/images/paris.svg";
import hotelImg from "../assets/images/hotel.png";
import activity1 from "../assets/images/louvre.svg";
import activity2 from "../assets/images/foodwalk.svg";
import activity3 from "../assets/images/seine.svg";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

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
>>>>>>> 5843ee64e9cfb9ff294e0addad2775d7df39d52c:Frontend/backup_20251017_233805/src/Trip-Planner/step5.jsx
