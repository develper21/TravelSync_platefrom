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