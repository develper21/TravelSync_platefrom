import React from "react";
import linaImg from "../assets/images/lina.png";
import sarahImg from "../assets/images/sarah.png";
import { FaLeaf, FaLightbulb } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import earthImg from "../assets/images/about2.png";
import aboutImg from "../assets/images/about1.png";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaGithub, FaWhatsapp } from "react-icons/fa";
import { FaRoute, FaHotel } from "react-icons/fa";
import { MdExplore, MdSupportAgent } from "react-icons/md";
import member1 from "../assets/images/team1.png";
import member2 from "../assets/images/team2.png";
import member3 from "../assets/images/team3.png";
import member4 from "../assets/images/team4.png";
import member5 from "../assets/images/team5.png";
import member6 from "../assets/images/team6.png";

const testimonials = [
  {
    id: 1,
    name: "Lina Su",
    location: "Singapore",
    img: linaImg, // 👈 apna image path yahan daalna manually
    review:
      "TravelSync made my eco-hotel booking and trip planning so easy. Loved the local experiences!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Wills",
    location: "London",
    img: sarahImg, // 👈 apna image path yahan daalna manually
    review:
      "Amazing support, and the trip planner created the perfect itinerary for my family!",
    rating: 5,
  },
];
const stats = [
  {
    id: 1,
    icon: <FaPlane size={28} className="text-blue-500" />,
    value: "1,323 +",
    label: "Trips Planned",
    color: "text-blue-600",
  },
  {
    id: 2,
    icon: <FaLeaf size={28} className="text-green-500" />,
    value: "1,363 +",
    label: "Eco-Stays Booked",
    color: "text-green-600",
  },
  {
    id: 3,
    icon: <FaMapMarkerAlt size={28} className="text-orange-500" />,
    value: "1,381 +",
    label: "Local Guides Onboard",
    color: "text-orange-600",
  },
  {
    id: 4,
    icon: <FaUsers size={28} className="text-blue-500" />,
    value: "20 +",
    label: "Team Members from 10 Cities",
    color: "text-blue-600",
  },
];
const teamMembers = [
  {
    name: "Alex Kim",
    role: "Co-Founder & CEO",
    desc: "Dreams of making travel accessible & sustainable for all.",
    img: member1,
    socials: [
      { icon: <FaLinkedin />, link: "#" },
      { icon: <FaTwitter />, link: "#" },
    ],
  },
  {
    name: "Maria Lopez",
    role: "CTO",
    desc: "Building tech that connects travelers with authentic experiences.",
    img: member2,
    socials: [
      { icon: <FaLinkedin />, link: "#" },
      { icon: <FaGithub />, link: "#" },
    ],
  },
  {
    name: "Samuel Chen",
    role: "Head of Product",
    desc: "Driven to simplify travel planning with AI and local insight.",
    img: member3,
    socials: [
      { icon: <FaLinkedin />, link: "#" },
      { icon: <FaFacebook />, link: "#" },
    ],
  },
  {
    name: "Priya Sharma",
    role: "Community Lead",
    desc: "Passionate about fostering travel communities worldwide.",
    img: member4,
    socials: [
      { icon: <FaLinkedin />, link: "#" },
      { icon: <FaInstagram />, link: "#" },
    ],
  },
  {
    name: "Jordan Baker",
    role: "UX Designer",
    desc: "Designs beautiful journeys for users and the planet.",
    img: member5,
    socials: [
      { icon: <FaLinkedin />, link: "#" },
      { icon: <FaTwitter />, link: "#" },
    ],
  },
  {
    name: "Emily Zhao",
    role: "Sustainability Lead",
    desc: "Committed to greener travel, one trip at a time.",
    img: member6,
    socials: [
      { icon: <FaLinkedin />, link: "#" },
      { icon: <FaWhatsapp />, link: "#" },
    ],
  },
];
const features = [
  {
    title: "Smart Trip Planner",
    desc: "Personalized itineraries powered by AI for effortless journeys.",
    icon: <FaRoute className="text-3xl text-blue-500 bg-blue-100 p-2 rounded-full" />,
  },
  {
    title: "Eco-Friendly Hotels",
    desc: "Handpicked stays that care for the environment and community.",
    icon: <FaHotel className="text-3xl text-green-500 bg-green-100 p-2 rounded-full" />,
  },
  {
    title: "Local Experience Curation",
    desc: "Discover authentic adventures with local guides and hosts.",
    icon: <MdExplore className="text-3xl text-orange-500 bg-orange-100 p-2 rounded-full" />,
  },
  {
    title: "24/7 Travel Support",
    desc: "Real people, ready to help anytime, anywhere in the world.",
    icon: <MdSupportAgent className="text-3xl text-sky-500 bg-sky-100 p-2 rounded-full" />,
  },
];
const About = () => {
  return (
    <>

    <div>
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Fallback <img> (most reliable across bundlers) */}
        <img
          src={aboutImg}
          alt="About background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          loading="lazy"
        />

        {/* Optional: also set as CSS background (works too) */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-20"
          style={{ backgroundImage: `url('${aboutImg}')` }}
          aria-hidden="true"
        />

        <div className="relative z-20 text-center max-w-3xl px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-snug">
            Empowering Smart, <br /> Sustainable Travel
          </h1>
          <p className="text-white mt-4 text-base md:text-lg">
            At TravelSync, we believe travel should be seamless, local, and
            eco-conscious.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition">
            Explore Destinations
          </button>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full py-16 px-6 md:px-12 lg:px-20 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              TravelSync exists to make travel more{" "}
              <span className="text-green-600 font-semibold">intelligent</span>,{" "}
              <span className="text-orange-500 font-semibold">eco-friendly</span>,
              and <span className="text-blue-600 font-semibold">local-first</span>.
              We envision a world where every journey creates positive impact for
              people and planet.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-gray-800">
                <FaLeaf className="text-green-600 text-xl" />
                <span className="font-medium">Sustainability</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <FaLightbulb className="text-orange-500 text-xl" />
                <span className="font-medium">Innovation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <FaLocationDot className="text-blue-600 text-xl" />
                <span className="font-medium">Local Focus</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image with labels */}
          <div className="flex-1 relative flex justify-center items-center">
            <img
              src={earthImg}
              alt="Earth"
              className="w-64 md:w-80 lg:w-96 drop-shadow-lg"
            />

            {/* Green Label */}
            <div className="absolute -top-4 md:-top-6 right-10 bg-white shadow-md px-3 py-1 rounded-full flex items-center gap-1 text-green-600 font-medium text-sm">
              <FaLeaf /> Green
            </div>

            {/* Local Label */}
            <div className="absolute bottom-6 left-10 bg-white shadow-md px-3 py-1 rounded-full flex items-center gap-1 text-orange-500 font-medium text-sm">
              <FaLocationDot /> Local
            </div>

            {/* Smart Label */}
            <div className="absolute bottom-0 right-12 bg-white shadow-md px-3 py-1 rounded-full flex items-center gap-1 text-blue-600 font-medium text-sm">
              💡 Smart
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-12">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-blue-600 font-medium">{member.role}</p>
              <p className="text-gray-600 text-sm mt-2">{member.desc}</p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-4 text-gray-600">
                {member.socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.link}
                    className="hover:text-blue-600 text-lg transition"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 bg-white px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-12">
          Why TravelSync?
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 bg-white px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center">
              {stat.icon}
              <h3 className={`mt-3 text-2xl md:text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </h3>
              <p className="mt-1 text-gray-600 text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 bg-gray-50 px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-12">
          What Travelers Say
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{t.name}</h3>
                  <p className="text-gray-500 text-sm">{t.location}</p>
                </div>
                {/* Stars */}
                <div className="ml-auto flex text-yellow-400">
                  {Array(t.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
              </div>

              {/* Review */}
              <div className="bg-blue-50 rounded-lg p-4 text-gray-700 text-sm relative">
                <FaQuoteLeft className="text-blue-400 mb-2" />
                <p>{t.review}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
 
    </>
  );
};

export default About;
