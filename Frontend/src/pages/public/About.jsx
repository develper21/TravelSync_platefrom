import React from 'react';
import { FaLeaf, FaLightbulb, FaMapMarkerAlt, FaPlane, FaUsers, FaStar, FaQuoteLeft, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { MdExplore, MdSupportAgent } from 'react-icons/md';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

const About = () => {
  const testimonials = [
    {
      id: 1,
      name: "Lina Su",
      location: "Singapore",
      review: "TravelSync made my eco-hotel booking and trip planning so easy. Loved the local experiences!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Wills",
      location: "London",
      review: "Amazing support, and the trip planner created the perfect itinerary for my family!",
      rating: 5,
    },
  ];

  const stats = [
    {
      id: 1,
      icon: <FaPlane size={28} className="text-blue-500" />,
      value: "1,323 +",
      label: "Trips Planned",
      color: "text-blue-600",
    },
    {
      id: 2,
      icon: <FaLeaf size={28} className="text-green-500" />,
      value: "1,363 +",
      label: "Eco-Stays Booked",
      color: "text-green-600",
    },
    {
      id: 3,
      icon: <FaMapMarkerAlt size={28} className="text-orange-500" />,
      value: "1,381 +",
      label: "Local Guides Onboard",
      color: "text-orange-600",
    },
    {
      id: 4,
      icon: <FaUsers size={28} className="text-blue-500" />,
      value: "20 +",
      label: "Team Members from 10 Cities",
      color: "text-blue-600",
    },
  ];

  const features = [
    {
      title: "Smart Trip Planner",
      desc: "Personalized itineraries powered by AI for effortless journeys.",
      icon: <FaPlane className="text-3xl text-blue-500 bg-blue-100 p-2 rounded-full" />,
    },
    {
      title: "Eco-Friendly Hotels",
      desc: "Handpicked stays that care for the environment and community.",
      icon: <FaLeaf className="text-3xl text-green-500 bg-green-100 p-2 rounded-full" />,
    },
    {
      title: "Local Experience Curation",
      desc: "Discover authentic adventures with local guides and hosts.",
      icon: <FaMapMarkerAlt className="text-3xl text-orange-500 bg-orange-100 p-2 rounded-full" />,
    },
    {
      title: "24/7 Travel Support",
      desc: "Real people, ready to help anytime, anywhere in the world.",
      icon: <FaUsers className="text-3xl text-sky-500 bg-sky-100 p-2 rounded-full" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/80"></div>
        <div className="relative z-20 text-center max-w-3xl px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-snug mb-6">
            Empowering Smart, <br /> Sustainable Travel
          </h1>
          <p className="text-white mt-4 text-base md:text-lg mb-8">
            At TravelSync, we believe travel should be seamless, local, and eco-conscious.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full py-16 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                Our Mission & Vision
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                TravelSync exists to make travel more{" "}
                <span className="text-green-600 font-semibold">intelligent</span>,{" "}
                <span className="text-orange-500 font-semibold">eco-friendly</span>,
                and <span className="text-blue-600 font-semibold">local-first</span>.
                We envision a world where every journey creates positive impact for
                people and planet.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-gray-800">
                  <FaLeaf className="text-green-600 text-xl" />
                  <span className="font-medium">Sustainability</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <FaLightbulb className="text-orange-500 text-xl" />
                  <span className="font-medium">Innovation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  <span className="font-medium">Local Focus</span>
                </div>
              </div>
            </div>

            {/* Right Side - Stats visualization */}
            <div className="flex-1 relative flex justify-center items-center">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1,323+</div>
                  <div className="text-sm text-gray-600">Trips</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1,363+</div>
                  <div className="text-sm text-gray-600">Eco-Stays</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">1,381+</div>
                  <div className="text-sm text-gray-600">Guides</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">20+</div>
                  <div className="text-sm text-gray-600">Team</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why TravelSync Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
              Why TravelSync?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center">
                {stat.icon}
                <h3 className={`mt-3 text-2xl md:text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </h3>
                <p className="mt-1 text-gray-600 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
              What Travelers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="w-full max-w-md">
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                    <div className="ml-auto flex text-yellow-400">
                      {Array(testimonial.rating)
                        .fill()
                        .map((_, i) => (
                          <FaStar key={i} />
                        ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 text-gray-700 text-sm relative">
                    <FaQuoteLeft className="text-blue-400 mb-2" />
                    <p>{testimonial.review}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
