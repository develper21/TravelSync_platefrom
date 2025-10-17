import React, {useState } from "react";
import Footer from "../components/footer";
import profileSrc from "../assets/images/team2.png";
import Navbar from "../components/navbar";


export default function ProfilePage() {
  const [activeMenu, setActiveMenu] = useState("profile");
  const [fullName, setFullName] = useState("Alex Jones");
  const [email, setEmail] = useState("alex.jones@email.com");
  const [phone, setPhone] = useState("+1 555 123 4567");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [language, setLanguage] = useState("English");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [tripReminders, setTripReminders] = useState(true);
  const [ecoSuggestions, setEcoSuggestions] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  function handleSaveChanges() {
    e.preventDefault();
    // demo: show message
    setSuccessMessage("Profile updated successfully!");
    // hide after 4s
    setTimeout(() => setSuccessMessage(""), 4000);
  }

  function handleUpdatePassword() {
    if (!newPassword || !confirmPassword) {
      setPasswordMessage("Please fill both password fields.");
      setTimeout(() => setPasswordMessage(""), 3000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match.");
      setTimeout(() => setPasswordMessage(""), 3000);
      return;
    }
    // demo success
    setPasswordMessage("Password updated.");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordMessage(""), 3000);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 font-sans">
      <Navbar/>
      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="sticky top-6 bg-white rounded-xl shadow p-4 space-y-4">
            <h3 className="text-lg font-medium">My Account</h3>

            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveMenu("bookings")}
                  className={`w-full text-left px-3 py-2 rounded-md ${activeMenu === "bookings" ? "bg-sky-50 text-sky-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  My Bookings
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveMenu("saved")}
                  className={`w-full text-left px-3 py-2 rounded-md ${activeMenu === "saved" ? "bg-sky-50 text-sky-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  Saved Destinations
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveMenu("history")}
                  className={`w-full text-left px-3 py-2 rounded-md ${activeMenu === "history" ? "bg-sky-50 text-sky-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  Trip History
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveMenu("profile")}
                  className={`w-full text-left px-3 py-2 rounded-md ${activeMenu === "profile" ? "bg-sky-600 text-white font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  Profile Settings
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveMenu("payment")}
                  className={`w-full text-left px-3 py-2 rounded-md ${activeMenu === "payment" ? "bg-sky-50 text-sky-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  Payment Methods
                </button>
              </li>

              <li>
                <button className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50">Logout</button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main */}
        <section className="md:col-span-3 space-y-6">
          <header>
            <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your personal info, preferences, and account.</p>
          </header>

          <form onSubmit={handleSaveChanges} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile card / left column */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <img src={profileSrc} alt="Profile" className="w-28 h-28 rounded-full object-cover ring-2 ring-slate-100" />
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-sky-600 text-white text-sm font-medium"
              >
                {/* simple upload icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="3" y="15" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
                </svg>
                Upload New Photo
              </button>

              <p className="text-xs text-gray-400 mt-3 text-center">Recommended: 400×400px. JPG or PNG.</p>
            </div>

            {/* Form inputs / middle & right columns */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 space-y-6">
              {/* Personal info */}
              <section>
                <h2 className="text-base font-semibold">Personal information</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Full Name</span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-2 rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      aria-label="Full Name"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Email Address</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 rounded-lg border border-gray-200 px-4 py-3 bg-gray-50"
                      aria-label="Email Address"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Phone Number</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 rounded-lg border border-gray-200 px-4 py-3"
                      aria-label="Phone Number"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Country / Location</span>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-2 rounded-lg border border-gray-200 px-4 py-3 bg-white"
                      aria-label="Country"
                    >
                      <option value="">Select Country</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Japan</option>
                      <option>France</option>
                      <option>India</option>
                    </select>
                  </label>

                  <label className="flex flex-col sm:col-span-2">
                    <span className="text-sm font-medium text-gray-700">Date of Birth</span>
                    <div className="relative">
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="mt-2 rounded-lg border border-gray-200 px-4 py-3 w-full"
                        aria-label="Date of Birth"
                      />
                      <span className="absolute right-3 top-3 text-gray-400">📅</span>
                    </div>
                  </label>
                </div>
              </section>

              {/* Preferences */}
              <section>
                <h2 className="text-base font-semibold">Preferences</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <div>
                      <div className="font-medium">Email notifications</div>
                      <div className="text-sm text-gray-500">Receive updates and offers</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      checked={tripReminders}
                      onChange={(e) => setTripReminders(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <div>
                      <div className="font-medium">Trip reminders</div>
                      <div className="text-sm text-gray-500">Booking & itinerary reminders</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      checked={ecoSuggestions}
                      onChange={(e) => setEcoSuggestions(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <div>
                      <div className="font-medium">Eco-friendly travel</div>
                      <div className="text-sm text-gray-500">Receive green suggestions</div>
                    </div>
                  </label>

                  <label className="flex flex-col p-3 border rounded-lg">
                    <div className="font-medium">Preferred language</div>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="mt-2 rounded-lg border border-gray-200 px-3 py-2"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>Japanese</option>
                    </select>
                  </label>
                </div>
              </section>

              {/* Security */}
              <section>
                <h2 className="text-base font-semibold">Security</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">New Password</span>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-2 rounded-lg border border-gray-200 px-4 py-3"
                      aria-label="New Password"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Confirm Password</span>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-2 rounded-lg border border-gray-200 px-4 py-3"
                      aria-label="Confirm Password"
                    />
                  </label>

                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleUpdatePassword}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 text-white font-semibold"
                    >
                      {/* lock icon */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Update Password
                    </button>

                    {passwordMessage && (
                      <div className="inline-block ml-4 text-sm text-gray-700">{passwordMessage}</div>
                    )}
                  </div>
                </div>
              </section>

              {/* Save area */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">Changes saved locally — click Save to confirm on your account.</div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-lg bg-sky-600 text-white font-semibold shadow"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Success banner */}
              {successMessage && (
                <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-emerald-700">
                  {successMessage}
                </div>
              )}
            </div>
          </form>
        </section>

        {/* (optional) small right column or empty on mobile; kept out to reduce clutter */}
      </main>
      <Footer/>
    </div>
  );
};
