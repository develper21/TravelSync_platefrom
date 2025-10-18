import React, { useState } from "react";
import { FaGlobe, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../../components/ui/Card";

const cities = [
    "New York, USA",
    "London, UK",
    "Paris, France",
    "Tokyo, Japan",
    "Dubai, UAE",
    "Sydney, Australia",
    "Rome, Italy",
    "Delhi, India",
];

export default function TripStep1() {
    const [destination, setDestination] = useState("");
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [travelers, setTravelers] = useState(1);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {};
        if (!destination) newErrors.destination = "Please select a destination";
        
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            // Save trip data to localStorage or state management
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
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Plan Your Trip
                    </h1>
                    <p className="text-lg text-gray-600">
                        Step 1: Choose your destination and travel dates
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Trip Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Trip Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Destination Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Destination <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.destination ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select a destination</option>
                                        {cities.map((city, index) => (
                                            <option key={index} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.destination && (
                                        <p className="mt-2 text-sm text-red-600">{errors.destination}</p>
                                    )}
                                </div>

                                {/* Travelers */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Travelers
                                    </label>
                                    <select
                                        value={travelers}
                                        onChange={(e) => setTravelers(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                            <option key={num} value={num}>
                                                {num} {num === 1 ? 'Traveler' : 'Travelers'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Date Selection */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Travel Dates</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <FaCalendarAlt className="text-blue-600 text-xl" />
                                        <span className="font-medium text-gray-900">
                                            Select your travel dates
                                        </span>
                                    </div>
                                    
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => setDateRange([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dateRange}
                                        className="w-full"
                                        minDate={new Date()}
                                    />

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {Math.ceil((dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24))} days
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {dateRange[0].startDate.toLocaleDateString()} - {dateRange[0].endDate.toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Trip Duration</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Continue Button */}
                    <div className="mt-8 text-center">
                        <Button type="submit" size="lg" className="px-8">
                            Continue to Preferences →
                        </Button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}
