import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay, FaTrash, FaCheckCircle, FaLock } from 'react-icons/fa';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import api from '../../services/api';

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [savedMethods, setSavedMethods] = useState([]);
  const [loadingMethods, setLoadingMethods] = useState(true);

  const [cardForm, setCardForm] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiry: '',
    cardType: 'Visa',
    billingAddress: ''
  });
  const [savingCard, setSavingCard] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchPayments();
    fetchUserMethods();
  }, []);

  const fetchPayments = async () => {
    setLoadingPayments(true);
    try {
      const res = await api.get('/payments');
      setPayments(res.data || []);
    } catch (err) {
      console.warn('Could not fetch payment history:', err);
    } finally {
      setLoadingPayments(false);
    }
  };

  const fetchUserMethods = async () => {
    setLoadingMethods(true);
    try {
      const res = await api.get('/user/profile');
      if (res.data?.user?.paymentMethods) {
        setSavedMethods(res.data.user.paymentMethods);
      }
    } catch (err) {
      console.warn('Could not fetch payment methods:', err);
    } finally {
      setLoadingMethods(false);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    setSavingCard(true);
    try {
      const last4 = cardForm.cardNumber.replace(/\s/g, '').slice(-4) || '4242';
      const res = await api.post('/user/payment-methods', {
        cardType: cardForm.cardType,
        last4,
        expiry: cardForm.expiry,
        cardHolderName: cardForm.cardHolderName,
        billingAddress: cardForm.billingAddress
      });
      setSavedMethods(res.data || []);
      setCardForm({ cardHolderName: '', cardNumber: '', expiry: '', cardType: 'Visa', billingAddress: '' });
      setSuccessMsg('Payment card securely added to your profile!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save card.');
    } finally {
      setSavingCard(false);
    }
  };

  const handleDeleteMethod = async (id) => {
    try {
      const res = await api.delete(`/user/payment-methods/${id}`);
      setSavedMethods(res.data || []);
    } catch (err) {
      alert('Failed to remove card.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
            Billing & Wallet
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-1">
            Payment Methods & Transactions
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your saved payment cards, billing details, and view verified booking receipts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Add / Manage Payment Methods */}
          <div className="lg:col-span-6 space-y-6">
            <Card className="rounded-3xl shadow-sm border border-gray-100">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <FaCreditCard className="text-blue-600" /> Saved Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                {savedMethods.length === 0 ? (
                  <p className="text-gray-400 text-sm py-4">No cards saved yet. Add one below for faster checkout.</p>
                ) : (
                  <div className="space-y-3 mb-6">
                    {savedMethods.map((pm) => (
                      <div
                        key={pm._id}
                        className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                            <FaCreditCard />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">
                              {pm.cardType} ending in •••• {pm.last4}
                            </p>
                            <p className="text-xs text-gray-500">
                              Expires {pm.expiry} {pm.cardHolderName ? `• ${pm.cardHolderName}` : ''}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteMethod(pm._id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition"
                          title="Remove card"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Card Form */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm mb-4">Add New Card</h4>
                  {successMsg && (
                    <div className="mb-4 bg-green-100 text-green-800 p-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                      <FaCheckCircle /> {successMsg}
                    </div>
                  )}
                  <form onSubmit={handleAddCard} className="space-y-4">
                    <Input
                      label="Cardholder Name *"
                      placeholder="John Doe"
                      value={cardForm.cardHolderName}
                      onChange={(e) => setCardForm({ ...cardForm, cardHolderName: e.target.value })}
                      required
                    />
                    <Input
                      label="Card Number *"
                      placeholder="4242 •••• •••• 4242"
                      value={cardForm.cardNumber}
                      onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry (MM/YY) *"
                        placeholder="12/28"
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                        required
                      />
                      <Input
                        label="Card Type"
                        placeholder="Visa / Mastercard"
                        value={cardForm.cardType}
                        onChange={(e) => setCardForm({ ...cardForm, cardType: e.target.value })}
                      />
                    </div>
                    <Button type="submit" disabled={savingCard} className="w-full font-bold">
                      <FaLock className="mr-2" />
                      {savingCard ? 'Saving...' : 'Save Payment Method'}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Transaction History */}
          <div className="lg:col-span-6">
            <Card className="rounded-3xl shadow-sm border border-gray-100">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl font-bold">Payment & Booking Receipts</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                {loadingPayments ? (
                  <p className="text-gray-400 py-6 text-sm">Loading transactions...</p>
                ) : payments.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <FaCheckCircle className="mx-auto text-4xl text-gray-200 mb-3" />
                    <p className="font-semibold text-gray-700">No payment records yet</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Payments will automatically appear here once you confirm bookings.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {payments.map((p) => (
                      <div
                        key={p._id}
                        className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-gray-900 text-sm">
                            {p.bookingId?.title || p.tripId?.title || 'Trip Booking'}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Txn: {p.transactionId || p._id.slice(-8).toUpperCase()} • {new Date(p.createdAt || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-green-600 block text-base">
                            ₹{(p.amount || 25000).toLocaleString()}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 font-bold px-2.5 py-0.5 rounded-full uppercase">
                            {p.status || 'Completed'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
