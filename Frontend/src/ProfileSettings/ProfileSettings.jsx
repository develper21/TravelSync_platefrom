import React, { useState } from "react";
import { FaUpload, FaCalendarAlt, FaEnvelope, FaBell, FaLeaf, FaGlobe, FaLock } from "react-icons/fa";

export default function ProfileSettings() {
  const [photo, setPhoto] = useState("/images/default-avatar.jpg");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "alex.jones@email.com",
    phone: "",
    country: "",
    dob: "",
    preferences: {
      emailNotifications: true,
      tripReminders: false,
      ecoFriendly: false,
      preferredLanguage: "English",
    },
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.preferences) {
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          [name]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-1">Profile Settings</h2>
      <p className="text-gray-500 mb-6">
        Manage your personal info, preferences, and account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-6"
      >
        {/* Profile Photo */}
        <div className="flex items-center gap-6">
          <img
            src={photo}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
            <FaUpload /> Upload New Photo
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Your Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="tel"
            name="phone"
            placeholder="+1 555 123 4567"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="Japan">Japan</option>
            <option value="France">France</option>
          </select>
          <div className="relative col-span-1">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <FaEnvelope className="text-blue-500" /> Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.preferences.emailNotifications}
                onChange={handleChange}
              />
              Email notifications
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="tripReminders"
                checked={formData.preferences.tripReminders}
                onChange={handleChange}
              />
              <FaBell className="text-gray-500" /> Trip reminders
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="ecoFriendly"
                checked={formData.preferences.ecoFriendly}
                onChange={handleChange}
              />
              <FaLeaf className="text-green-500" /> Eco-friendly travel suggestions
            </label>
            <div>
              <label className="flex items-center gap-2 mb-1">
                <FaGlobe className="text-blue-500" /> Preferred language
              </label>
              <select
                name="preferredLanguage"
                value={formData.preferences.preferredLanguage}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div>
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <FaLock className="text-gray-700" /> Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <button
            type="button"
            className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Update Password
          </button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
