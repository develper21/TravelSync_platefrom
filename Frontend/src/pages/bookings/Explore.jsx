import React, { useState, useEffect } from "react";
import { Search, MapPin, Star, Heart, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card, { CardContent } from "../../components/ui/Card";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const categories = ["All", "Beach", "Culture", "Adventure", "Eco-Friendly", "Luxury", "History"];

export default function Explore() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [ecoOnly, setEcoOnly] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchDestinations();
  }, [query, activeCategory, ecoOnly, currentPage]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSavedDestinations();
    }
  }, [isAuthenticated]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 9,
      };
      if (query.trim()) params.search = query.trim();
      if (activeCategory !== "All") params.tag = activeCategory;
      if (ecoOnly) params.ecoFriendly = 'true';

      const res = await api.get('/destinations', { params });
      setDestinations(res.data.destinations || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalCount(res.data.total || 0);
    } catch (err) {
      console.error("Failed to load destinations:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedDestinations = async () => {
    try {
      const res = await api.get('/user/saved-destinations');
      const ids = new Set((res.data || []).map(item => item._id || item));
      setSavedIds(ids);
    } catch (err) {
      console.warn("Could not load wishlist:", err);
    }
  };

  const toggleSaveDestination = async (e, destId) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("Please sign in to save destinations!");
      navigate('/signin');
      return;
    }

    try {
      if (savedIds.has(destId)) {
        await api.delete(`/user/remove-destination/${destId}`);
        const next = new Set(savedIds);
        next.delete(destId);
        setSavedIds(next);
      } else {
        await api.post(`/user/save-destination/${destId}`);
        const next = new Set(savedIds);
        next.add(destId);
        setSavedIds(next);
      }
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header Title */}
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
            Curated Global Wonders
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-3">
            Explore Destinations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover breathtaking eco-friendly escapes, authentic cultural immersion, and plan your journey in minutes.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by city, country, or interest (e.g. Bali, France, Beaches)..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-12 py-3 rounded-2xl w-full"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer bg-green-50 px-4 py-3 rounded-2xl border border-green-200 text-green-800 font-semibold text-sm hover:bg-green-100 transition flex-shrink-0">
              <input
                type="checkbox"
                checked={ecoOnly}
                onChange={(e) => {
                  setEcoOnly(e.target.checked);
                  setCurrentPage(1);
                }}
                className="rounded text-green-600 focus:ring-green-500 w-4 h-4 cursor-pointer"
              />
              <Leaf className="w-4 h-4 text-green-600" />
              <span>Eco-Certified Only</span>
            </label>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Result Grid */}
        {loading ? (
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-500 font-medium">Fetching destinations...</p>
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <MapPin className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">No destinations found</h3>
            <p className="text-gray-500 mt-2 mb-6">Try adjusting your search keyword or selected filters.</p>
            <Button onClick={() => { setQuery(""); setActiveCategory("All"); setEcoOnly(false); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {destinations.map((dest) => {
              const isSaved = savedIds.has(dest._id);
              const imgUrl = dest.images?.[0] || "/images/bali.png";

              return (
                <div
                  key={dest._id}
                  onClick={() => navigate(`/destinations/${dest._id}`)}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {dest.ecoFriendly && (
                        <span className="flex items-center gap-1 bg-green-500/95 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          <Leaf className="w-3 h-3" /> Eco
                        </span>
                      )}
                      <span className="bg-black/50 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {dest.type || 'Explore'}
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleSaveDestination(e, dest._id)}
                      className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow ${
                        isSaved
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-gray-700 hover:bg-white hover:text-red-500"
                      }`}
                      title={isSaved ? "Saved" : "Save to Wishlist"}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                    </button>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur text-gray-900 font-bold text-xs px-3 py-1.5 rounded-full shadow">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{dest.rating || 4.8}</span>
                      <span className="text-gray-400">({dest.reviews?.length || 1})</span>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500" /> {dest.location}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {dest.name}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {dest.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {(dest.tags || []).slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-400 uppercase font-semibold">Est. budget</span>
                        <div className="text-xl font-black text-green-600">
                          {dest.priceEstimate || "₹25,000"}
                        </div>
                      </div>

                      <Button size="sm" className="rounded-xl font-bold">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-gray-700 bg-white px-5 py-2.5 rounded-2xl border border-gray-200 shadow-sm">
              Page {currentPage} of {totalPages} ({totalCount} destinations)
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
