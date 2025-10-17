import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would process the payment
    alert('Payment method saved successfully!');
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <FaCreditCard /> },
    { id: 'paypal', name: 'PayPal', icon: <FaPaypal /> },
    { id: 'apple', name: 'Apple Pay', icon: <FaApplePay /> },
    { id: 'google', name: 'Google Pay', icon: <FaGooglePay /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Methods
          </h1>
          <p className="text-gray-600">
            Manage your payment methods and billing information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Add Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      paymentMethod === method.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {method.icon}
                    </div>
                    <span className="font-medium text-gray-900">{method.name}</span>
                  </label>
                ))}
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      name="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />

                    <Input
                      label="CVV"
                      name="cvv"
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Input
                    label="Cardholder Name"
                    name="cardHolderName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.cardHolderName}
                    onChange={handleChange}
                    required
                  />

                  <Button type="submit" className="w-full" size="lg">
                    Save Payment Method
                  </Button>
                </form>
              )}

              {paymentMethod !== 'card' && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600 mb-4">
                    You selected {paymentMethods.find(m => m.id === paymentMethod)?.name}
                  </p>
                  <Button className="w-full" size="lg">
                    Connect {paymentMethods.find(m => m.id === paymentMethod)?.name}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    description: 'Hotel Booking - Grand Plaza Hotel',
                    amount: '$299.00',
                    date: 'March 15, 2024',
                    status: 'completed',
                  },
                  {
                    id: 2,
                    description: 'Trip Planning - Tokyo Adventure',
                    amount: '$149.00',
                    date: 'March 10, 2024',
                    status: 'completed',
                  },
                  {
                    id: 3,
                    description: 'Flight Booking - JFK to NRT',
                    amount: '$850.00',
                    date: 'March 5, 2024',
                    status: 'pending',
                  },
                ].map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{payment.description}</p>
                      <p className="text-sm text-gray-500">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{payment.amount}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        payment.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  View All Payments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Billing Address"
                name="billingAddress"
                type="text"
                placeholder="123 Main Street"
                value=""
              />

              <Input
                label="City"
                name="city"
                type="text"
                placeholder="New York"
                value=""
              />

              <Input
                label="State"
                name="state"
                type="text"
                placeholder="NY"
                value=""
              />

              <Input
                label="ZIP Code"
                name="zipCode"
                type="text"
                placeholder="10001"
                value=""
              />
            </div>

            <div className="mt-6">
              <Button className="w-full sm:w-auto">
                Update Billing Information
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
