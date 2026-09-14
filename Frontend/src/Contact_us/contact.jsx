import React, { useState } from "react";

import bgImage from "../assets/contact.png";
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// custom marker icon (leaflet ka default fix ke liye)
const customIcon = new L.Icon({
  iconUrl: "https://res.cloudinary.com/dtkzxbcjx/image/upload/v1757957268/pin_ebyhje.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MumbaiCoords = [19.076, 72.8777];

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 13);
  return null;
};

const ContactSection = () => {
  const [goToHQ, setGoToHQ] = useState(false);

  return (
    <>
  
      {/* Hero Section */}
      <section className="w-full flex justify-center items-center bg-gradient-to-r from-white to-blue-50 py-12 px-4">
        <div
          className="max-w-3xl w-full text-center relative rounded-xl"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            minHeight: "200px",
          }}
        >
          <div className="relative z-10 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              We’d Love to Hear From You!
            </h2>
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Whether you have a question, need help, or just want to say hello, <br />
              our team is here for you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="w-full flex justify-center items-center py-16 px-4 bg-white">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-6 flex-1">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows="4"
                  placeholder="Type your message..."
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
              >
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>

          {/* Info Card (Fixed Size) */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6 max-w-sm w-full self-start">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Address</h4>
                <p className="text-gray-600 text-sm">
                  123 Explorer Ave, Wander City, CA 90001
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaPhoneAlt size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Phone</h4>
                <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <FaEnvelope size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p className="text-gray-600 text-sm">support@travelsync.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-gray-100 text-gray-600">
                <FaClock size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Working Hours</h4>
                <p className="text-gray-600 text-sm">Mon - Fri: 9AM - 7PM (PST)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full flex flex-col justify-center items-center py-12 bg-blue-50">
        <div className="w-full max-w-4xl">
          <MapContainer
            center={[20.5937, 78.9629]} // Default India center
            zoom={4}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {goToHQ && (
              <>
                <ChangeMapView coords={MumbaiCoords} />
                <Marker position={MumbaiCoords} icon={customIcon}>
                  <Popup>Our HQ</Popup>
                </Marker>
              </>
            )}
          </MapContainer>

          {/* Help Center Section (Text + Button) */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow">
            <p className="text-gray-800 font-medium mb-4 md:mb-0">
              Looking for quick answers? Visit our Help Center.
            </p>
            <button
              onClick={() => setGoToHQ(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              <span>❓</span> Go to Help Center
            </button>
          </div>
        </div>
      </section>
   
    </>
  );
};

export default ContactSection;
