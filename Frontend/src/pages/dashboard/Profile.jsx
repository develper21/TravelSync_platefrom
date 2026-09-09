import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrash,
  FaHeart,
  FaTicketAlt,
  FaCog,
  FaLock,
  FaLeaf,
  FaCreditCard,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

export default function Profile() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialTab = searchParams.get('tab') || 'trips';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Trips State
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  // Bookings State
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Saved Destinations State
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    emailNotifications: user?.preferences?.emailNotifications ?? true,
    ecoFriendlySuggestions: user?.preferences?.ecoFriendlySuggestions ?? true,
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');

  // Password Change State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    fetchTrips();
    fetchBookings();
    fetchSavedDestinations();
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get('/user/profile');
      if (res.data?.user) {
        const u = res.data.user;
        setProfileForm({
          fullName: u.fullName || '',
          email: u.email || '',
          phone: u.phone || '',
          country: u.country || '',
          emailNotifications: u.preferences?.emailNotifications ?? true,
          ecoFriendlySuggestions: u.preferences?.ecoFriendlySuggestions ?? true,
        });
      }
    } catch (err) {
      console.warn('Could not fetch latest profile:', err);
    }
  };

  const fetchTrips = async () => {
    setLoadingTrips(true);
    try {
      const res = await api.get('/trips');
      setTrips(res.data || []);
    } catch (err) {
      console.error('Error fetching trips:', err);
    } finally {
      setLoadingTrips(false);
    }
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await api.get('/bookings');
      setBookings(res.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchSavedDestinations = async () => {
    setLoadingSaved(true);
    try {
      const res = await api.get('/user/saved-destinations');
      setSavedDestinations(res.data || []);
    } catch (err) {
      console.error('Error fetching saved destinations:', err);
    } finally {
      setLoadingSaved(false);
    }
  };

  const handleDeleteTrip = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trip itinerary?')) return;
    try {
      await api.delete(`/trips/${id}`);
      setTrips(trips.filter((t) => t._id !== id));
    } catch (err) {
      alert('Failed to delete trip.');
    }
  };

  const handleRemoveSaved = async (id) => {
    try {
      await api.delete(`/user/remove-destination/${id}`);
      setSavedDestinations(savedDestinations.filter((d) => d._id !== id));
    } catch (err) {
      alert('Failed to remove destination from wishlist.');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess('');
    try {
      await api.put('/user/profile', {
        fullName: profileForm.fullName,
        phone: profileForm.phone,
        country: profileForm.country,
        preferences: {
          emailNotifications: profileForm.emailNotifications,
          ecoFriendlySuggestions: profileForm.ecoFriendlySuggestions,
        }
      });
      setProfileSuccess('Profile preferences updated successfully!');
      setTimeout(() => setProfileSuccess(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setPasswordSaving(true);
    setPasswordMsg('');
    setPasswordError('');
    try {
      await api.put('/auth/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setPasswordMsg('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordMsg(''), 4000);
    } catch (err) {
      setPasswordError(err.response?.data?.error || 'Failed to change password.');
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg">
              {profileForm.fullName ? profileForm.fullName[0].toUpperCase() : 'T'}
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">{profileForm.fullName || 'Traveler'}</h1>
              <p className="text-gray-500 font-medium">{profileForm.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <FaLeaf /> Sustainable Explorer
                </span>
                {profileForm.country && (
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                    📍 {profileForm.country}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => navigate('/trip-planner-1')} className="font-bold rounded-2xl shadow-md">
              + Plan New Journey
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {[
            { id: 'trips', label: `My Trips (${trips.length})`, icon: <FaCalendarAlt /> },
            { id: 'bookings', label: `Bookings & Orders (${bookings.length})`, icon: <FaTicketAlt /> },
            { id: 'wishlist', label: `Saved Wishlist (${savedDestinations.length})`, icon: <FaHeart /> },
            { id: 'settings', label: 'Settings & Security', icon: <FaCog /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchParams({ tab: tab.id });
              }}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: MY TRIPS */}
        {activeTab === 'trips' && (
          <div>
            {loadingTrips ? (
              <div className="text-center py-20 bg-white rounded-3xl">Loading trips...</div>
            ) : trips.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8">
                <FaMapMarkerAlt className="mx-auto text-4xl text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">No planned trips yet</h3>
                <p className="text-gray-500 mt-2 mb-6">Create your 5-step eco-friendly itinerary now!</p>
                <Button onClick={() => navigate('/trip-planner-1')}>Start Planning</Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {trips.map((trip) => (
                  <div
                    key={trip._id}
                    className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-5 w-full md:w-auto">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{trip.destination}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-blue-500" />
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>{trip.travelers || 1} Travelers</span>
                          <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
                            {trip.status || 'Planning'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                      {trip.budget > 0 && (
                        <div className="text-right mr-2">
                          <span className="text-xs text-gray-400 block uppercase font-semibold">Budget</span>
                          <span className="text-lg font-black text-green-600">₹{trip.budget.toLocaleString()}</span>
                        </div>
                      )}
                      <button
                        onClick={() => handleDeleteTrip(trip._id)}
                        className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition"
                        title="Delete Trip"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY BOOKINGS */}
        {activeTab === 'bookings' && (
          <div>
            {loadingBookings ? (
              <div className="text-center py-20 bg-white rounded-3xl">Loading bookings...</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8">
                <FaTicketAlt className="mx-auto text-4xl text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">No active bookings</h3>
                <p className="text-gray-500 mt-2 mb-6">Complete a trip itinerary and book with confirmed receipt.</p>
                <Button onClick={() => navigate('/explore')}>Explore Destinations</Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {bookings.map((bk) => (
                  <div
                    key={bk._id}
                    className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                          Ref: {bk.bookingReference || bk._id.slice(-8).toUpperCase()}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                          <FaCheckCircle /> {bk.paymentStatus || 'Paid'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{bk.title || 'TravelSync Trip Booking'}</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        📍 {bk.location} • Booked on {new Date(bk.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block uppercase font-semibold">Total Paid</span>
                        <span className="text-2xl font-black text-green-600">
                          ₹{(bk.amount || bk.price || 25000).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED DESTINATIONS (WISHLIST) */}
        {activeTab === 'wishlist' && (
          <div>
            {loadingSaved ? (
              <div className="text-center py-20 bg-white rounded-3xl">Loading saved wishlist...</div>
            ) : savedDestinations.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8">
                <FaHeart className="mx-auto text-4xl text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h3>
                <p className="text-gray-500 mt-2 mb-6">Browse destinations and click the heart icon to save for later.</p>
                <Button onClick={() => navigate('/explore')}>Explore Now</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDestinations.map((dest) => (
                  <div
                    key={dest._id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between"
                  >
                    <div className="relative h-48">
                      <img
                        src={dest.images?.[0] || '/images/bali.png'}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemoveSaved(dest._id)}
                        className="absolute top-4 right-4 p-2.5 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                        title="Remove from wishlist"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{dest.name}</h4>
                        <p className="text-gray-500 text-sm mb-4">📍 {dest.location}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/destinations/${dest._id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => navigate(`/trip-planner-1?destination=${encodeURIComponent(dest.name)}`)}
                        >
                          Plan Trip
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS & SECURITY */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile & Preferences */}
            <Card className="rounded-3xl shadow-sm border border-gray-100">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl font-bold">Profile & Travel Preferences</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                {profileSuccess && (
                  <div className="mb-4 bg-green-100 text-green-800 p-3 rounded-xl text-sm font-semibold">
                    {profileSuccess}
                  </div>
                )}
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <Input
                    label="Full Name"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    required
                  />
                  <Input
                    label="Email Address"
                    value={profileForm.email}
                    disabled={true}
                  />
                  <Input
                    label="Phone Number"
                    placeholder="+1 555 123 4567"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                  <Input
                    label="Country of Residence"
                    placeholder="e.g. India, United States"
                    value={profileForm.country}
                    onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                  />

                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <h5 className="text-sm font-bold text-gray-700">Notification Preferences</h5>
                    <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={profileForm.ecoFriendlySuggestions}
                        onChange={(e) => setProfileForm({ ...profileForm, ecoFriendlySuggestions: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      Receive eco-friendly travel suggestions & discounts
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={profileForm.emailNotifications}
                        onChange={(e) => setProfileForm({ ...profileForm, emailNotifications: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      Email notifications for booking confirmations & trip reminders
                    </label>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" disabled={profileSaving} className="w-full font-bold">
                      {profileSaving ? 'Saving Changes...' : 'Save Profile Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card className="rounded-3xl shadow-sm border border-gray-100">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl font-bold">Security & Password</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                {passwordMsg && (
                  <div className="mb-4 bg-green-100 text-green-800 p-3 rounded-xl text-sm font-semibold">
                    {passwordMsg}
                  </div>
                )}
                {passwordError && (
                  <div className="mb-4 bg-red-100 text-red-800 p-3 rounded-xl text-sm font-semibold">
                    {passwordError}
                  </div>
                )}
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    required
                  />
                  <Input
                    label="New Password"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                  />
                  <div className="pt-4">
                    <Button type="submit" disabled={passwordSaving} className="w-full font-bold">
                      {passwordSaving ? 'Updating Password...' : 'Change Password'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
