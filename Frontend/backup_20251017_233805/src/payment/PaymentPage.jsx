import React, { useState } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaWallet,
} from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Payment() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(null);
  const [paying, setPaying] = useState(false);
  const totalAmount = 52800; // ₹52,800

  function formatINR(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
  }

  function handleApplyPromo() {
    // demo: fake promo "TRAVEL10" gives 10% off
    if (!promo) return setPromoApplied("Enter code");
    if (promo.trim().toUpperCase() === "TRAVEL10") {
      setPromoApplied("10% off applied");
    } else {
      setPromoApplied("Invalid code");
    }
    setTimeout(() => setPromoApplied(null), 3000);
  }

  function handlePay(e) {
    e.preventDefault();
    // basic validation
    if (!fullName || !email || !cardNumber || !expiry || !cvv) {
      alert("Please fill required payment fields.");
      return;
    }
    setPaying(true);
    // demo: simulate payment
    setTimeout(() => {
      setPaying(false);
      alert("Payment successful — booking confirmed!");
    }, 1400);
  }

  const effectiveAmount =
    promo.trim().toUpperCase() === "TRAVEL10" ? Math.round(totalAmount * 0.9) : totalAmount;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter">
        <Navbar/>
      {/* HERO + MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Payment form */}
        <section className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold">Complete Your Payment</h1>
              <p className="text-sm text-gray-500 mt-1">You're one step away from your adventure.</p>
            </div>

            <form onSubmit={handlePay} className="space-y-6">
              {/* Personal inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Full Name</span>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-2 rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-sky-100"
                    placeholder="Your full name"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 rounded-lg border border-gray-200 px-4 py-3"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="flex flex-col sm:col-span-1">
                  <span className="text-sm font-medium">Phone Number</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 rounded-lg border border-gray-200 px-4 py-3"
                    placeholder="+91 9xx xxx xxxx"
                  />
                </label>

                <label className="flex flex-col sm:col-span-2">
                  <span className="text-sm font-medium">Card Number</span>
                  <div className="mt-2 relative">
                    <input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      inputMode="numeric"
                      placeholder="xxxx xxxx xxxx xxxx"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-32"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2 text-gray-400">
                      <FaCcVisa className="w-6 h-4" />
                      <FaCcMastercard className="w-6 h-4" />
                      <FaCcAmex className="w-6 h-4" />
                    </div>
                  </div>
                </label>
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Expiry Date</span>
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="mt-2 rounded-lg border border-gray-200 px-4 py-3"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">CVV</span>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    inputMode="numeric"
                    className="mt-2 rounded-lg border border-gray-200 px-4 py-3"
                  />
                </label>
              </div>

              {/* Country + Zip */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Country</span>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-2 rounded-lg border border-gray-200 px-4 py-3 bg-white"
                  >
                    <option value="">Select Country</option>
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>France</option>
                    <option>Japan</option>
                  </select>
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">Zip</span>
                  <input
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Postal code"
                    className="mt-2 rounded-lg border border-gray-200 px-4 py-3"
                  />
                </label>
              </div>

              {/* Save info */}
              <div className="flex items-center gap-3">
                <input
                  id="saveinfo"
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="saveinfo" className="text-sm text-gray-600">
                  Save this info for future trips
                </label>
              </div>

              {/* Accepted + Pay button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="font-medium">Accepted:</span>
                  <FaCcVisa className="w-6 h-4 text-gray-500" />
                  <FaCcMastercard className="w-6 h-4 text-gray-500" />
                  <FaCcDiscover className="w-6 h-4 text-gray-500" />
                  <div className="ml-1 inline-flex items-center bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded">
                    <span className="mr-1 font-bold">UPI</span>
                    <FaWallet className="w-3 h-3" />
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="text-sm text-gray-600 text-right">
                    <div className="text-xs">Total</div>
                    <div className="text-lg font-extrabold">{formatINR(effectiveAmount)}</div>
                  </div>

                  <button
                    type="submit"
                    onClick={handlePay}
                    disabled={paying}
                    className="px-5 py-3 bg-sky-600 text-white rounded-lg font-semibold shadow disabled:opacity-60"
                  >
                    {paying ? "Processing..." : `Pay ${formatINR(effectiveAmount)}`}
                  </button>
                </div>
              </div>

              {/* Promo */}
              <div className="flex items-center gap-3">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Enter promo code"
                  className="rounded-lg border border-gray-200 px-4 py-2"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-2 bg-emerald-500 text-white rounded-md font-medium"
                >
                  Apply
                </button>
                {promoApplied && <div className="text-sm text-gray-700">{promoApplied}</div>}
              </div>

              <p className="text-xs text-gray-500">
                All transactions are secured with 256-bit encryption.
              </p>
            </form>
          </div>
        </section>

        {/* Right: Trip summary / aside */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Trip Summary</h3>
              <button className="text-sm text-sky-600">Back to Review</button>
            </div>

            <div className="text-gray-600">
              <div className="font-semibold text-lg text-gray-900">Bali, Indonesia</div>
              <div className="text-sm mt-1">Jun 15 - 22, 2025</div>
              <div className="text-sm mt-1">2 Travelers</div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Total Amount</div>
                <div className="text-xl font-extrabold text-gray-900">{formatINR(totalAmount)}</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-sm font-medium">Promo Code</div>
              <div className="flex gap-2 mt-2">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2"
                />
                <button onClick={handleApplyPromo} className="px-3 py-2 bg-sky-600 text-white rounded-lg font-medium">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </aside>
      </main>
      <Footer/>
    </div>
  );
}
