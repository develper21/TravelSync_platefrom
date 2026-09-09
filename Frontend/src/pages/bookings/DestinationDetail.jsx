import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaStar,
  FaLeaf,
  FaHeart,
  FaRegHeart,
  FaCalendarAlt,
  FaCompass,
  FaLightbulb,
  FaArrowLeft,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState('');

  useEffect(() => {
    fetchDestination();
    if (isAuthenticated) {
      checkIfSaved();
    }
  }, [id, isAuthenticated]);

  const fetchDestination = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/destinations/${id}`);
      setDestination(res.data);
    } catch (err) {
      console.error('Failed to load destination:', err);
      setError('Destination not found or network issue.');
    } finally {
      setLoading(false);
    }
  };

  const checkIfSaved = async () => {
    try {
      const res = await api.get('/user/saved-destinations');
      const savedList = res.data || [];
      const exists = savedList.some(item => (item._id || item) === id);
      setIsSaved(exists);
    } catch (err) {
      console.warn('Could not check saved status:', err);
    }
  };

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to save destinations to your wishlist!');
      navigate('/signin');
      return;
    }

    setSaveLoading(true);
    try {
      if (isSaved) {
        await api.delete(`/user/remove-destination/${id}`);
        setIsSaved(false);
      } else {
        await api.post(`/user/save-destination/${id}`);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      alert('Failed to update wishlist.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePlanTrip = () => {
    navigate(`/trip-planner-1?destination=${encodeURIComponent(destination.name)}`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please sign in to leave a review!');
      navigate('/signin');
      return;
    }

    if (!reviewComment.trim()) {
      alert('Please enter your review comments.');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await api.post(`/destinations/${id}/review`, {
        rating: reviewRating,
        comment: reviewComment,
      });
      setDestination(res.data);
      setReviewComment('');
      setReviewRating(5);
      setReviewSuccess('Thank you! Your review has been added.');
      setTimeout(() => setReviewSuccess(''), 4000);
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert(err.response?.data?.error || 'Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Header />
        <div className="text-center py-32">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Discovering destination details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Header />
        <div className="max-w-2xl mx-auto text-center py-32 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Destination Not Found</h2>
          <p className="text-gray-600 mb-8">{error || 'We could not find the requested destination.'}</p>
          <Link to="/explore">
            <Button>
              <FaArrowLeft className="mr-2" /> Back to Explore
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const primaryImage = destination.images && destination.images.length > 0 ? destination.images[0] : '/images/bali.png';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[480px] w-full bg-gray-900 overflow-hidden">
        <img
          src={primaryImage}
          alt={destination.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-black/30" />

        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/explore"
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-gray-800 font-semibold text-sm hover:bg-white transition shadow"
          >
            <FaArrowLeft /> Back to Explore
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 z-20 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {destination.ecoFriendly && (
                <span className="flex items-center gap-1.5 bg-green-500/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                  <FaLeaf /> Eco-Certified Destination
                </span>
              )}
              <span className="bg-blue-600/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {destination.type || 'Travel Destination'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-md">
              {destination.name}
            </h1>

            <p className="flex items-center text-gray-200 text-lg mt-2 drop-shadow">
              <FaMapMarkerAlt className="text-red-400 mr-2" />
              {destination.location}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleToggleSave}
              disabled={saveLoading}
              className={`p-4 rounded-2xl backdrop-blur-md transition-all shadow-lg flex items-center justify-center ${
                isSaved
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white/90 text-gray-700 hover:bg-white hover:text-red-500'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save to Wishlist'}
            >
              {isSaved ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
            </button>

            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-xl px-8" onClick={handlePlanTrip}>
              <FaCalendarAlt className="mr-2" /> Plan Trip Here
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left 2 Columns: Description, Highlights, Experiences */}
          <div className="lg:col-span-2 space-y-10">

            {/* Overview */}
            <Card className="rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-6">
                <CardTitle className="text-2xl font-bold text-gray-900">About {destination.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>{destination.description}</p>

                {destination.tags && destination.tags.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Keywords & Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 font-semibold rounded-xl text-sm border border-blue-100">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Highlights & Top Experiences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Highlights */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6 text-orange-500">
                  <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <FaLightbulb size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Key Highlights</h3>
                </div>
                <ul className="space-y-3">
                  {(destination.highlights && destination.highlights.length > 0
                    ? destination.highlights
                    : ['Scenic scenic landscapes', 'Historic architectural monuments', 'Local culinary culture']
                  ).map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experiences */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6 text-blue-500">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <FaCompass size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Curated Experiences</h3>
                </div>
                <ul className="space-y-3">
                  {(destination.experiences && destination.experiences.length > 0
                    ? destination.experiences
                    : ['Guided conservation hikes', 'Local artisan culinary masterclass', 'Sunset scenic sailing']
                  ).map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Travel Tips & Best Time */}
            {destination.travelTips && destination.travelTips.length > 0 && (
              <div className="bg-gradient-to-br from-blue-500/5 via-blue-500/10 to-transparent p-8 rounded-3xl border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaLightbulb className="text-yellow-500" /> Sustainable Traveler Tips
                </h3>
                <div className="grid gap-3">
                  {destination.travelTips.map((tip, idx) => (
                    <div key={idx} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-blue-50 text-gray-700 text-sm font-medium">
                      💡 {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Traveler Reviews</h3>
                  <p className="text-gray-500 text-sm mt-1">Verified stories and genuine recommendations</p>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-200">
                  <FaStar className="text-yellow-500 text-xl" />
                  <span className="text-2xl font-black text-gray-900">{destination.rating || 4.8}</span>
                  <span className="text-gray-400 text-sm">/ 5</span>
                </div>
              </div>

              {/* Review Submission Form */}
              <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 space-y-4">
                <h4 className="font-bold text-gray-900 text-lg">Leave Your Review</h4>
                {reviewSuccess && (
                  <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl text-sm font-semibold">
                    {reviewSuccess}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className={`text-2xl transition ${
                          star <= reviewRating ? 'text-yellow-500 scale-110' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-2 font-bold text-gray-700 self-center">{reviewRating} Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your sustainable travel tips, favourite spots, or local advice..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <Button type="submit" disabled={submittingReview} className="w-full sm:w-auto">
                  <FaPaperPlane className="mr-2" />
                  {submittingReview ? 'Submitting...' : 'Post Review'}
                </Button>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {destination.reviews && destination.reviews.length > 0 ? (
                  destination.reviews.map((rev, index) => (
                    <div key={index} className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900">{rev.name}</span>
                        <div className="flex text-yellow-400 text-sm">
                          {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{rev.comment}</p>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {new Date(rev.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-6">Be the first to leave a review for {destination.name}!</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Quick Booking Info & Map */}
          <div className="space-y-6">

            {/* Quick Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-gray-100">
                <div>
                  <span className="text-xs uppercase font-bold text-gray-400">Estimated Budget</span>
                  <div className="text-3xl font-black text-green-600 mt-1">
                    {destination.priceEstimate || '₹25,000'}
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Avg. per person
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Best Season</span>
                  <span className="font-bold text-gray-800">{destination.bestTimeToVisit || 'Apr - Oct'}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Eco-Friendly</span>
                  <span className="font-bold text-green-600">
                    {destination.ecoFriendly ? 'Yes (Verified)' : 'Standard'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-bold text-gray-800">⭐ {destination.rating || 4.8} / 5.0</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 py-4 text-base font-bold shadow-lg"
                onClick={handlePlanTrip}
              >
                Plan 5-Step Trip
              </Button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Personalized AI itinerary, eco-hotels & live booking
              </p>

              {/* Map Embed */}
              {destination.mapEmbedUrl && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" /> Location Map
                  </h4>
                  <div className="w-full h-56 rounded-2xl overflow-hidden border border-gray-200">
                    <iframe
                      title={destination.name}
                      src={destination.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
