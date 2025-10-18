import React, { useState } from "react";
import { MapPin, Star, Search, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../../components/ui/Card";

const Explore = () => {
   const navigate = useNavigate(); 
  const [query, setQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // ✅ Pagination state
  const cardsPerPage = 9; // ✅ har page pe 6 cards dikhayenge

  // Dummy destinations (API se bhi aa sakte hai)
  const destinations = [
    {
      name: "Bali, Indonesia",
      image: "/images/bali.png",
      rating: 4.8,
      price: "₹25,000",
      description: "Tropical paradise with beautiful beaches and rich culture",
      features: ["Beaches", "Culture", "Adventure"]
    },
    {
      name: "Paris, France",
      image: "/images/paris.png",
      rating: 4.9,
      price: "₹45,000",
      description: "City of love with iconic landmarks and romantic atmosphere",
      features: ["Landmarks", "Romance", "Culture"]
    },
    {
      name: "Tokyo, Japan",
      image: "/images/tokyo.png",
      rating: 4.7,
      price: "₹35,000",
      description: "Modern metropolis blending tradition with cutting-edge technology",
      features: ["Technology", "Culture", "Food"]
    },
    {
      name: "Santorini, Greece",
      image: "/images/santorini.png",
      rating: 4.9,
      price: "₹40,000",
      description: "Stunning sunsets and white-washed buildings on volcanic cliffs",
      features: ["Sunsets", "Architecture", "Romance"]
    },
    {
      name: "Dubai, UAE",
      image: "/images/dubai.png",
      rating: 4.6,
      price: "₹30,000",
      description: "Luxury destination with modern architecture and desert adventures",
      features: ["Luxury", "Adventure", "Shopping"]
    },
    {
      name: "Maldives",
      image: "/images/maldives.png",
      rating: 4.9,
      price: "₹60,000",
      description: "Overwater bungalows and crystal-clear turquoise waters",
      features: ["Beaches", "Luxury", "Romance"]
    },
    {
      name: "London, UK",
      image: "/images/london.png",
      rating: 4.5,
      price: "₹35,000",
      description: "Historic city with world-class museums and royal palaces",
      features: ["History", "Museums", "Culture"]
    },
    {
      name: "Kyoto, Japan",
      image: "/images/kyoto.png",
      rating: 4.8,
      price: "₹28,000",
      description: "Ancient temples and traditional Japanese culture",
      features: ["Temples", "Culture", "Nature"]
    },
    {
      name: "Rome, Italy",
      image: "/images/rome.png",
      rating: 4.7,
      price: "₹32,000",
      description: "Eternal city with ancient ruins and delicious cuisine",
      features: ["History", "Food", "Architecture"]
    }
  ];

  // Input change par filter karo
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim() === "") {
      setFilteredDestinations([]);
    } else {
      const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinations(filtered);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(destinations.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentDestinations = destinations.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Destinations
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing places around the world and plan your perfect trip
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={query}
                  onChange={handleSearch}
                  className="w-full"
                />
              </div>
              <Button className="w-full md:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {(query ? filteredDestinations : currentDestinations).map((destination, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
                  ⭐ {destination.rating}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {destination.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {destination.price}
                  </span>
                  <Button size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {!query && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get Travel Inspiration
            </h2>
            <p className="text-gray-600 mb-6">
              Subscribe to receive weekly travel tips and destination guides
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
