import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaHotel, FaMapMarkerAlt, FaLeaf, FaUsers, FaStar } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const Home = () => {
  const features = [
    {
      icon: <FaPlane className="text-3xl text-blue-600" />,
      title: 'Smart Trip Planning',
      description: 'AI-powered itineraries tailored to your preferences and budget.',
    },
    {
      icon: <FaHotel className="text-3xl text-green-600" />,
      title: 'Eco-Friendly Hotels',
      description: 'Handpicked sustainable accommodations that care for the environment.',
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-orange-600" />,
      title: 'Local Experiences',
      description: 'Connect with authentic local guides and cultural experiences.',
    },
    {
      icon: <FaLeaf className="text-3xl text-green-600" />,
      title: 'Sustainable Travel',
      description: 'Carbon-neutral trips that support local communities.',
    },
  ];

  const stats = [
    { number: '1,323+', label: 'Trips Planned', icon: <FaPlane /> },
    { number: '1,363+', label: 'Eco-Stays Booked', icon: <FaHotel /> },
    { number: '1,381+', label: 'Local Guides', icon: <FaUsers /> },
    { number: '4.9/5', label: 'Customer Rating', icon: <FaStar /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-green-600/90"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Journey to
            <span className="block text-yellow-300">Sustainable Travel</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Discover amazing destinations, plan eco-friendly trips, and create unforgettable memories
            with our AI-powered travel platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/trips">
              <Button size="lg" className="w-full sm:w-auto">
                Start Planning
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TravelSync?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine technology with sustainability to provide you with the best travel experience possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-2">
                  <div className="text-2xl">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of travelers who trust TravelSync for their sustainable travel needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg">
                Create Account
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
