import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { FaTrash, FaEdit, FaShieldAlt } from "react-icons/fa";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const PaymentMethods = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "visa",
      last4: "4242",
      expiry: "12/26",
      default: true,
    },
    {
      id: 2,
      type: "mastercard",
      last4: "8888",
      expiry: "08/25",
      default: false,
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCard = (e) => {
    e.preventDefault();
    if (!form.number || !form.name) return;
    const newCard = {
      id: Date.now(),
      type: form.number.startsWith("4") ? "visa" : "mastercard",
      last4: form.number.slice(-4),
      expiry: form.expiry,
      default: false,
    };
    setCards([...cards, newCard]);
    setForm({
      name: "",
      number: "",
      expiry: "",
      cvv: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
    });
  };

  const setDefault = (id) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, default: true } : { ...card, default: false }
      )
    );
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <FaShieldAlt className="text-blue-600" /> Payment Methods
      </h2>
      <p className="text-gray-500 mb-6">
        Manage your saved payment methods for seamless booking
      </p>

      {/* Saved Cards */}
      <div className="space-y-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex justify-between items-center border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex items-center gap-4">
              {card.type === "visa" ? (
                <FaCcVisa className="text-4xl text-blue-600" />
              ) : (
                <FaCcMastercard className="text-4xl text-red-600" />
              )}
              <div>
                <p className="font-semibold">
                  •••• •••• •••• {card.last4}
                </p>
                <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                {card.default && (
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!card.default ? (
                <button
                  className="flex items-center gap-1 text-gray-500 text-sm"
                  onClick={() => setDefault(card.id)}
                >
                  <MdRadioButtonUnchecked /> Set Default
                </button>
              ) : (
                <MdRadioButtonChecked className="text-blue-600" />
              )}
              <FaEdit className="text-blue-500 cursor-pointer" />
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => deleteCard(card.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add New Payment Method */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h3 className="font-semibold mb-4">Add New Payment Method</h3>
        <form onSubmit={addCard} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Cardholder Name"
            className="w-full border rounded-lg p-2"
          />
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="w-full border rounded-lg p-2"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              className="w-full border rounded-lg p-2"
            />
            <input
              type="text"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="CVV"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <h4 className="font-semibold mt-4">Billing Address</h4>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address Line 1"
            className="w-full border rounded-lg p-2"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border rounded-lg p-2"
            />
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              placeholder="ZIP Code"
              className="w-full border rounded-lg p-2"
            />
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option>United States</option>
              <option>India</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Save Payment Method
          </button>
        </form>
      </div>

      {/* Secure Note */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
        <FaShieldAlt />
        Secure Payment Processing — Your payment data is encrypted and never stored.
      </div>
    </div>
  );
};

export default PaymentMethods;
