import React, { useState, useEffect } from "react";
import { FaGlobe, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import api from "../../services/api";

const defaultCities = [
  "Bali, Indonesia",
  "Paris, France",
  "Tokyo, Japan",
  "Santorini, Greece",
  "Dubai, UAE",
  "Maldives",
  "London, UK",
  "Kyoto, Japan",
  "Rome, Italy"
];

export default function TripStep1() {
  const [searchParams] = useSearchParams();
  const preselectedDest = searchParams.get('destination') || '';

  const [destination, setDestination] = useState(preselectedDest);
  const [destOptions, setDestOptions] = useState(defaultCities);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);
  const [travelers, setTravelers] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch live destinations from backend
    api.get('/destinations?limit=30')
      .then(res => {
        if (res.data?.destinations && res.data.destinations.length > 0) {
          const names = res.data.destinations.map(d => d.name);
          setDestOptions(Array.from(new Set([...names, ...defaultCities])));
        }
      })
      .catch(err => console.warn('Could not load destinations list:', err));
  }, []);

  useEffect(() => {
    if (preselectedDest) {
      setDestination(preselectedDest);
    }
  }, [preselectedDest]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!destination) newErrors.destination = "Please select a destination";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const tripData = {
        destination,
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate,
        travelers,
      };

      localStorage.setItem('tripData', JSON.stringify(tripData));
      navigate('/trip-planner-2');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
            Step 1 of 5
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-2">
            Plan Your Journey
          </h1>
          <p className="text-base text-gray-600">
            Choose your target destination, dates, and number of travelers
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Trip Details */}
            <Card className="rounded-3xl shadow-sm border border-gray-100">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold">Trip Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6 pt-0">
                {/* Destination Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.destination ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a destination</option>
                    {destOptions.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.destination && (
                    <p className="mt-1 text-sm text-red-600">{errors.destination}</p>
                  )}
                </div>

                {/* Travelers Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                    className="w-full"
                  />
                </div>

                {/* Selected Details Preview */}
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-blue-900 mb-2">Selected Itinerary:</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-600" />
                      {destination || "No destination selected"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaGlobe className="text-blue-600" />
                      {travelers} traveler{travelers > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card className="rounded-3xl shadow-sm border border-gray-100">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" /> Select Travel Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex justify-center">
                <DateRange
                  ranges={dateRange}
                  onChange={(item) => setDateRange([item.selection])}
                  minDate={new Date()}
                  rangeColors={["#3B82F6"]}
                  className="rounded-xl overflow-hidden border border-gray-100"
                />
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg" className="rounded-2xl font-bold px-8 shadow-md">
              Continue to Step 2 →
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
