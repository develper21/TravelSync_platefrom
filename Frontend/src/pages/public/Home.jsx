import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Button from "../../components/ui/Button";
import api from "../../services/api";

const PLACEHOLDER = "/images/bali.png";

const DestinationCard = ({ _id, images, name, rating, description, priceEstimate, ecoFriendly, navigate }) => {
  const img = images && images.length > 0 ? images[0] : PLACEHOLDER;

  return (
    <div
      onClick={() => navigate(`/destinations/${_id}`)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group border border-slate-100"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {ecoFriendly && (
          <span className="absolute top-3 left-3 bg-green-500/90 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            🌱 Eco-Friendly
          </span>
        )}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold flex items-center shadow">
          <span className="text-yellow-400 mr-1">★</span> {rating || 4.8}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
            {name}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 mb-4">
            {description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-base font-extrabold text-green-600">
            {priceEstimate || "₹25,000"}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/destinations/${_id}`);
            }}
            className="px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-600 hover:text-white transition"
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition border border-slate-100">
    <div className="flex justify-center mb-4">{icon}</div>
    <h4 className="text-lg font-bold mb-2 text-slate-900">{title}</h4>
    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const Testimonial = ({ avatar = PLACEHOLDER, name, location, text }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center">
    <img
      src={avatar}
      alt={name}
      className="w-16 h-16 rounded-full object-cover mb-4 ring-4 ring-blue-50"
    />
    <div className="font-bold text-slate-900">
      {name} <span className="text-xs text-slate-400 font-normal">/ {location}</span>
    </div>
    <p className="text-sm text-slate-600 mt-3 italic leading-relaxed">{text}</p>
  </div>
);

const Homepage = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribedMsg, setSubscribedMsg] = useState("");

  useEffect(() => {
    // Fetch live destinations from database
    api.get('/destinations?limit=6')
      .then(res => {
        setDestinations(res.data.destinations || []);
      })
      .catch(err => console.warn('Could not fetch destinations for homepage:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await api.post('/contact', {
        name: 'Newsletter Subscriber',
        email: newsletterEmail,
        subject: 'Newsletter Subscription',
        message: 'User requested newsletter subscription.'
      });
      setSubscribedMsg('Thank you for subscribing! Sustainable travel tips are on the way.');
      setNewsletterEmail('');
      setTimeout(() => setSubscribedMsg(''), 5000);
    } catch (err) {
      setSubscribedMsg('Thank you for subscribing!');
      setNewsletterEmail('');
      setTimeout(() => setSubscribedMsg(''), 5000);
    }
  };

  const features = [
    {
      icon: <div className="text-3xl">✈️</div>,
      title: "Smart Trip Planner",
      desc: "Personalized multi-step itineraries with seamless booking.",
    },
    {
      icon: <div className="text-3xl">🏨</div>,
      title: "Eco-Certified Resorts",
      desc: "Verified sustainable accommodations that care for our planet.",
    },
    {
      icon: <div className="text-3xl">📍</div>,
      title: "Local Experiences",
      desc: "Support local communities with authentic cultural immersion.",
    },
    {
      icon: <div className="text-3xl">📞</div>,
      title: "24/7 Concierge Support",
      desc: "Dedicated travelers helpline whenever you need assistance.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="relative flex items-center justify-center h-[650px] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/Homepage.png')" }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(15, 23, 42, 0.85), rgba(30, 58, 138, 0.6) 50%, rgba(0,0,0,0.4))",
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl px-4 sm:px-6 lg:px-8">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-full mb-4">
              Smart Tourism Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight text-white drop-shadow-md">
              Explore the World Smarter with{" "}
              <span className="text-green-400">TravelSync</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/90 max-w-xl drop-shadow">
              Discover, plan, and book eco-friendly trips with verified stays and sustainable itineraries.
            </p>

            {/* Live Search Card */}
            <form onSubmit={handleHeroSearch} className="mt-8 bg-white shadow-2xl rounded-2xl p-3 w-full max-w-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex-1 w-full text-left px-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Search Destination
                  </label>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mt-1 w-full border-none p-0 text-slate-800 font-bold focus:outline-none focus:ring-0 placeholder-slate-400 text-sm sm:text-base"
                    placeholder="Where would you like to go? (e.g. Bali, Paris, Tokyo)"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 flex-shrink-0"
                >
                  Explore Now →
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Live Featured Destinations */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Live From Database
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">
              Popular Global Destinations
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-sm font-bold text-blue-600 hover:text-blue-800 mt-2 sm:mt-0"
          >
            View All Destinations ({destinations.length > 0 ? '9+' : 'Browse'}) →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent" />
            <p className="mt-3 text-slate-500 text-sm font-medium">Fetching destinations from database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((d) => (
              <DestinationCard key={d._id} {...d} navigate={navigate} />
            ))}
          </div>
        )}
      </section>

      {/* Why TravelSync Section */}
      <section className="py-16 bg-gradient-to-r from-slate-100 via-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-slate-900">
              Why Travelers Choose TravelSync
            </h3>
            <p className="text-slate-600 mt-2 text-base">Designed for the conscious and curious modern explorer.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <FeatureCard
                key={idx}
                icon={
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 text-2xl shadow-xs">
                    {f.icon}
                  </div>
                }
                title={f.title}
                desc={f.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary Banner */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wider">
              5-Step Wizard
            </span>
            <h4 className="text-2xl font-black text-slate-900 mt-3 mb-4">Sample Smart Itinerary</h4>
            <div className="space-y-4 text-slate-700">
              <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-xl">
                  ✈️
                </div>
                <div>
                  <div className="font-bold text-sm">Step 1: Destination & Dates</div>
                  <div className="text-xs text-slate-500">Pick anywhere from Bali to Kyoto</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-xl">
                  🏨
                </div>
                <div>
                  <div className="font-bold text-sm">Step 3: Eco-Accommodation</div>
                  <div className="text-xs text-slate-500">Solar-powered retreats & boutique villas</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-xl">
                  🎟️
                </div>
                <div>
                  <div className="font-bold text-sm">Step 5: Instant Live Booking</div>
                  <div className="text-xs text-slate-500">Verified voucher stored directly in your Dashboard</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-3xl font-black text-slate-900 mb-3">
              Your Entire Journey, Synced & Visualized
            </h4>
            <p className="text-slate-600 mb-6 text-base leading-relaxed">
              TravelSync connects destination guides, eco-hotel reservations, curated local activities, and payment receipts in one unified platform.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/trip-planner-1')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20"
            >
              Start 5-Step Trip Planner →
            </Button>
          </div>
        </div>
      </section>

      {/* Traveler Reviews */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-black text-center mb-10">
            What Our Travelers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial
              name="Amit Sharma"
              location="India"
              avatar="/images/team1.png"
              text={`"TravelSync's planner made booking my Bali eco-resort effortless! The verified receipt in my dashboard was seamless."`}
            />
            <Testimonial
              name="Elena Rostova"
              location="France"
              avatar="/images/team1.png"
              text={`"The curated experiences and transparent sustainability tips are genuine. Highly recommended platform!"`}
            />
            <Testimonial
              name="Sophia Martinez"
              location="Spain"
              avatar="/images/team1.png"
              text={`"Being able to save destinations to my wishlist and instantly plan a 5-step trip is brilliant."`}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/20">
            <h4 className="text-3xl font-black mb-2">
              Stay Inspired With Sustainable Travel
            </h4>
            <p className="text-white/80 mb-6 text-sm sm:text-base">
              Receive curated travel guides, hidden gem itineraries, and exclusive seasonal offers straight to your inbox.
            </p>
            {subscribedMsg && (
              <div className="mb-4 bg-white text-green-800 p-3 rounded-xl font-bold text-sm shadow">
                {subscribedMsg}
              </div>
            )}
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 rounded-xl bg-white text-slate-800 px-4 py-3 text-sm focus:outline-none placeholder-slate-400"
                placeholder="Enter your email address..."
              />
              <button
                type="submit"
                className="rounded-xl bg-slate-900 hover:bg-black text-white px-8 py-3 font-bold text-sm shadow-md transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
