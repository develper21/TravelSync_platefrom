import React, { useState } from "react";
import { FaCreditCard, FaLock } from "react-icons/fa";
import { SiVisa, SiMastercard, SiGooglepay } from "react-icons/si";
import { MdPayment } from "react-icons/md";
import { SiPhonepe } from "react-icons/si";

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    country: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment Successful 🚀");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row items-start gap-4 w-full max-w-5xl">
        {/* Left Side - Payment Form */}
        <div className="flex-1">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-1">Complete Your Payment</h1>
          <p className="text-gray-500 mb-6">
            You're one step away from your adventure.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-lg bg-white rounded-xl shadow-md p-6 space-y-4"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded-lg focus:outline-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded-lg focus:outline-blue-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded-lg focus:outline-blue-500"
                required
              />
            </div>

            {/* Card Number with Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-2 rounded-lg focus:outline-blue-500"
                  required
                />
                <FaCreditCard className="absolute right-3 top-3 text-gray-400 text-lg" />
              </div>
            </div>

            {/* Expiry + CVV */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full bg-gray-100 p-2 rounded-lg focus:outline-blue-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-2 rounded-lg focus:outline-blue-500"
                  required
                />
              </div>
            </div>

            {/* Country + Zip */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-2 rounded-lg focus:outline-blue-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full bg-gray-100 p-2 rounded-lg focus:outline-blue-500"
                  required
                />
              </div>
            </div>

            {/* Save Info */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="saveInfo" />
              <label htmlFor="saveInfo" className="text-sm text-gray-600">
                Save this info for future trips
              </label>
            </div>

            {/* Accepted Payments */}
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>Accepted:</span>
              <SiVisa className="text-blue-600 text-xl" />
              <SiMastercard className="text-red-600 text-xl" />
              <SiPhonepe className="text-purple-600 text-xl" />
              <MdPayment className="text-green-600 text-xl" />
              <SiGooglepay className="text-blue-500 text-xl" />
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
            >
              Pay ₹52,800
            </button>

            {/* Security */}
            <p className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
              <FaLock /> All transactions are secured with 256-bit encryption.
            </p>
          </form>
        </div>

        {/* Right Side - Trip Summary */}
        <div className="w-full lg:w-80 h-fit bg-white rounded-xl shadow-md p-6 space-y-4 ">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-blue-600">Trip Summary</h2>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Back to Review
            </a>
          </div>
          <h3 className="text-lg font-bold">Bali, Indonesia</h3>
          <p className="text-gray-500 text-sm">Jun 15 – 22, 2025</p>
          <p className="text-gray-500 text-sm">2 Travelers</p>
          <div className="flex justify-between items-center border-t pt-3 mt-3">
            <span className="font-medium">Total Amount</span>
            <span className="text-xl font-bold">₹52,800</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 border p-2 rounded-lg focus:outline-blue-500"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
