import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import api from '../../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await api.post('/contact', formData);
      setSuccessMessage(res.data.message || 'Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMessage(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-blue-600 text-xl" />,
      title: 'Phone Support',
      content: '+1 (555) 123-4567',
      description: 'Call us for immediate booking or trip assistance',
    },
    {
      icon: <FaEnvelope className="text-green-600 text-xl" />,
      title: 'Email Us',
      content: 'support@travelsync.com',
      description: 'We typically respond within 2-4 business hours',
    },
    {
      icon: <FaMapMarkerAlt className="text-orange-600 text-xl" />,
      title: 'Global Headquarters',
      content: '123 Travel Boulevard, Suite 400',
      description: 'San Francisco, CA 94105',
    },
    {
      icon: <FaClock className="text-purple-600 text-xl" />,
      title: 'Operating Hours',
      content: 'Mon-Fri: 9AM - 7PM (EST)',
      description: 'Weekend emergency concierge on-call 24/7',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
            We're Here For You
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
            Get in Touch with TravelSync
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question about sustainable destinations, your trip planner, or enterprise partnerships? Drop us a note!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Channels</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="p-3 bg-white rounded-xl shadow-xs flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{info.title}</h4>
                      <p className="text-blue-600 font-semibold text-sm mt-0.5">{info.content}</p>
                      <p className="text-gray-500 text-xs mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <Card className="rounded-3xl shadow-sm border border-gray-100">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
                <p className="text-gray-500 text-sm mt-1">Our travel advisory team will get back to you promptly.</p>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                {successMessage && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                    <div>
                      <p className="font-bold">Message Received!</p>
                      <p className="text-sm">{successMessage}</p>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm font-semibold">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name *"
                      name="name"
                      placeholder="e.g. Maya Lin"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email Address *"
                      name="email"
                      type="email"
                      placeholder="e.g. maya@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    placeholder="e.g. Custom Trip Planning Query"
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your upcoming travel plans, questions, or feedback..."
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 text-sm"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="w-full font-bold shadow-md">
                    <FaPaperPlane className="mr-2" />
                    {loading ? 'Sending Message...' : 'Submit Inquiry'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
