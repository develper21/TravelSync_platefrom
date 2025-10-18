import React, { useState } from "react";
import { FaGlobe, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
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

export default function TripPlanner() {
    const [destination, setDestination] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const handleDestinationChange = (e) => {
        const value = e.target.value;
        setDestination(value);

        if (value.length > 0) {
            const suggestions = cities.filter((city) =>
                city.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCities(suggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelectCity = (city) => {
        setDestination(city);
        setShowSuggestions(false);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
                {/* Heading */}
                <div className="w-full max-w-6xl mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Plan Your Journey
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Where and when do you want to go?
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-6xl">
                    {/* Left Box */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-2/3 lg:w-1/2">
                        <h2 className="text-lg font-semibold mb-4">Choose Destination</h2>
                        <div className="relative mb-6">
                            <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
                                <FaGlobe className="text-blue-500" />
                                <input
                                    type="text"
                                    placeholder="Search city or country..."
                                    className="w-full outline-none"
                                    value={destination}
                                    onChange={handleDestinationChange}
                                />
                            </div>
                            {showSuggestions && (
                                <ul className="absolute bg-white border rounded-xl mt-2 w-full shadow-lg z-10">
                                    {filteredCities.length > 0 ? (
                                        filteredCities.map((city, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => handleSelectCity(city)}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {city}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-2 text-gray-400">No results</li>
                                    )}
                                </ul>
                            )}
                        </div>

                        <h2 className="text-lg font-semibold mb-4">Select Travel Dates</h2>
                        <div className="flex items-center gap-2 border rounded-xl px-3 py-2 mb-4">
                            <FaCalendarAlt
                                className="text-blue-500 cursor-pointer"
                                onClick={() => setShowCalendar(!showCalendar)}
                            />
                            <input
                                type="text"
                                value={`${dateRange[0].startDate.toDateString()} - ${dateRange[0].endDate.toDateString()}`}
                                readOnly
                                className="w-full outline-none"
                            />
                        </div>

                        {showCalendar && (
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => setDateRange([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                className="rounded-xl shadow-md"
                            />
                        )}

                        {/* Buttons */}
                        <div className="flex justify-between items-center mt-6">
                            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                                Cancel
                            </button>
                            <button className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                                Next Step →
                            </button>
                        </div>

                        {/* Step Progress */}
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500">Step <b>1</b> of 5</span>
                            <div className="w-40 h-2 bg-gray-200 rounded-full mt-2">
                                <div className="w-2/5 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Box */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 lg:w-1/4">
                        <h2 className="text-lg font-semibold mb-4">Your Trip Summary</h2>
                        <p className="flex items-center gap-2 mb-2">
                            <FaMapMarkerAlt className="text-blue-500" />
                            <span>
                                <span className="font-semibold">Destination: </span>
                                {destination || "--"}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <FaCalendarAlt className="text-blue-500" />
                            <span>
                                <span className="font-semibold">Dates: </span>
                                {`${dateRange[0].startDate.toDateString()} - ${dateRange[0].endDate.toDateString()}`}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
