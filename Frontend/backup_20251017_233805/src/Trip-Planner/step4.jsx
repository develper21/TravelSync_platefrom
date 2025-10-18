import React, { useState } from "react";
import {
  Clock,
  IndianRupee, // Replaced DollarSign
  MapPin,
  Calendar,
  Compass,
  Home,
  X,
  ChevronLeft,
  ChevronRight,
  Mountain,
  UtensilsCrossed,
  Ticket,
  Anchor,
  Bike,
  Landmark,
  Sparkles,
  Tent,
  Search,
  ChevronDown,
  User,
} from "lucide-react";

// Activity Card Component - Updated to show Rupee icon and formatted budget
const ActivityCard = ({ activity, isSelected, onSelect }) => {
  const { icon, name, tag, duration, budget } = activity;
  return (
    <div
      onClick={onSelect}
      className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-blue-500 bg-white"
          : "border-transparent bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white mb-3">
          {React.cloneElement(icon, { size: 32 })}
        </div>
        <h3 className="font-bold text-gray-800 text-md">{name}</h3>
        <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {duration}
          </span>
          <span className="flex items-center gap-1.5">
            <IndianRupee size={14} /> {budget.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        className="absolute top-4 right-4 w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      {tag && (
        <span className="absolute top-4 left-4 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-semibold">
          {tag}
        </span>
      )}
    </div>
  );
};

export default function ActivitiesPage() {
  const [selectedActivities, setSelectedActivities] = useState([
    "Food Tour",
    "Mountain Hiking",
  ]);

  // Added category, durationValue (hours), and budget (numeric) for filtering
  const allActivities = [
    { name: "Mountain Hiking", duration: "4 hrs", budget: 2500, tag: "Local Only", icon: <Mountain />, category: 'Adventure', durationValue: 4 },
    { name: "Food Tour", duration: "2 hrs", budget: 800, icon: <UtensilsCrossed />, category: 'Culture', durationValue: 2 },
    { name: "Theater Night", duration: "3 hrs", budget: 4000, icon: <Ticket />, category: 'Culture', durationValue: 3 },
    { name: "Scuba Diving", duration: "Full-day", budget: 7500, icon: <Anchor />, category: 'Adventure', durationValue: 8 },
    { name: "City Cycling Tour", duration: "2 hrs", budget: 1200, icon: <Bike />, category: 'Adventure', durationValue: 2 },
    { name: "Museum Visit", duration: "Half-day", budget: 1500, icon: <Landmark />, category: 'Culture', durationValue: 4 },
    { name: "Wellness Spa", duration: "2 hrs", budget: 3000, icon: <Sparkles />, category: 'Relax', durationValue: 2 },
    { name: "Camping", duration: "Full-day", budget: 5500, icon: <Tent />, category: 'Adventure', durationValue: 8 },
  ];

  const [filters, setFilters] = useState({
    category: 'All',
    duration: 'Any',
    budget: 'Any',
    search: ''
  });

  const toggleActivity = (name) => {
    setSelectedActivities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredActivities = allActivities.filter(activity => {
    // Category filter
    if (filters.category !== 'All' && activity.category !== filters.category) return false;
    
    // Duration filter
    if (filters.duration !== 'Any') {
      const durationValue = activity.durationValue;
      if (filters.duration === 'short' && durationValue > 2) return false;
      if (filters.duration === 'half' && (durationValue <= 2 || durationValue > 4)) return false;
      if (filters.duration === 'full' && durationValue < 5) return false;
    }

    // Budget filter
    if (filters.budget !== 'Any') {
        const budgetValue = activity.budget;
        if (filters.budget === 'low' && budgetValue > 1000) return false;
        if (filters.budget === 'mid' && (budgetValue < 1001 || budgetValue > 3000)) return false;
        if (filters.budget === 'high' && budgetValue < 3001) return false;
    }

    // Search filter
    if (filters.search && !activity.name.toLowerCase().includes(filters.search.toLowerCase())) return false;

    return true;
  });
  
  const currentStep = 4;

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-xl mx-auto md:ml-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Pick Your Favorite Activities
            </h1>
            <p className="text-gray-600 mt-1">
              Select things you’d love to experience during your trip.
            </p>
          </div>
          
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left - Activities */}
          <div className="flex-1">
            {/* Filters with state handling */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="relative">
                <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full md:w-auto pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-700">
                  <option value="All">Category: All</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Culture">Culture</option>
                  <option value="Relax">Relax</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select name="duration" value={filters.duration} onChange={handleFilterChange} className="w-full md:w-auto pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-700">
                  <option value="Any">Duration: Any</option>
                  <option value="short">Up to 2 hrs</option>
                  <option value="half">Half-day (2-4 hrs)</option>
                  <option value="full">Full-day</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select name="budget" value={filters.budget} onChange={handleFilterChange} className="w-full md:w-auto pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-700">
                  <option value="Any">Budget: Any</option>
                  <option value="low">Under ₹1000</option>
                  <option value="mid">₹1000 - ₹3000</option>
                  <option value="high">Over ₹3000</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative flex-grow">
                <input name="search" type="text" placeholder="Search activities..." value={filters.search} onChange={handleFilterChange} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"/>
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Activities Grid - Renders filtered activities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <ActivityCard
                    key={activity.name}
                    activity={activity}
                    isSelected={selectedActivities.includes(activity.name)}
                    onSelect={() => toggleActivity(activity.name)}
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">No activities match your filters.</p>
              )}
            </div>
            
            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-8">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition text-sm"> <ChevronLeft className="w-4 h-4" /> Back </button>
                 <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">Step <b>4</b> of 5</span>
            <div className="w-40 h-2 bg-gray-200 rounded-full mt-2">
              <div className="w-4/5 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
               <button className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
            Next Step →
          </button>
            </div>
          </div>

          {/* Right - Trip Summary */}
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Trip Summary</h3>
              <div className="space-y-3 text-sm border-b border-gray-200 pb-4">
                <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gray-400" /> <span className="font-semibold text-gray-600">Destination:</span> <span className="text-gray-900 font-medium">Barcelona</span></p>
                <p className="flex items-center gap-3"><Calendar className="w-4 h-4 text-gray-400" /> <span className="font-semibold text-gray-600">Dates:</span> <span className="text-gray-900 font-medium">Jun 18–22, 2025</span></p>
                <p className="flex items-center gap-3"><Compass className="w-4 h-4 text-gray-400" /> <span className="font-semibold text-gray-600">Experience:</span> <span className="text-gray-900 font-medium">Adventure, Culture</span></p>
                <p className="flex items-center gap-3"><Home className="w-4 h-4 text-gray-400" /> <span className="font-semibold text-gray-600">Stay:</span> <span className="text-gray-900 font-medium">Urban Hostel</span></p>
              </div>
              <div className="mt-4">
                <p className="font-bold text-gray-800 text-sm mb-3">Activities</p>
                <div className="flex flex-wrap gap-2">
                  {selectedActivities.map((act) => (
                    <div key={act} className="flex items-center gap-2 bg-blue-50 border border-blue-200 pl-3 pr-2 py-1 rounded-md">
                      <span className="text-sm text-blue-800 font-medium">{act}</span>
                      <button onClick={() => toggleActivity(act)} className="text-blue-500 hover:text-blue-700">
                         <X size={16} />
                      </button>
                    </div>
                  ))}
                  {selectedActivities.length === 0 && <p className="text-xs text-gray-400">No activities selected.</p>}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

