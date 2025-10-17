import React from 'react'
import heroBg from "../assets/images/blog.png";
import img1 from "../assets/images/blog1.png";
import img2 from "../assets/images/blog2.png";
import img3 from "../assets/images/blog3.png";
import img4 from "../assets/images/blog4.png";
import img5 from "../assets/images/blog5.png";
import img6 from "../assets/images/blog6.png";
import editorImg from "../assets/images/editor-card.png"; 
import Navbar from '../components/navbar';
import Footer from '../components/footer';
const blogs = [
  {
    id: 1,
    image: img1,
    trending: true,
    category: "Local Tips",
    categoryColor: "bg-blue-500",
    title: "5 Local Secrets in Barcelona for the Curious Explorer",
    desc: "Get off the beaten path with these hidden gems and authentic experiences in Spain’s vibrant city.",
  },
  {
    id: 2,
    image: img2,
    trending: false,
    category: "Eco-Friendly Travel",
    categoryColor: "bg-green-500",
    title: "How to Travel Sustainably in Southeast Asia",
    desc: "Simple swaps and mindful choices for an eco-conscious adventure across Vietnam, Thailand, and more.",
  },
  {
    id: 3,
    image: img3,
    trending: false,
    category: "Guides",
    categoryColor: "bg-orange-400",
    title: "Ultimate Guide: Trekking the Andes for Beginners",
    desc: "Everything you need to plan, pack, and stay safe while exploring South America's most iconic peaks.",
  },
  {
    id: 4,
    image: img4,
    trending: false,
    category: "Smart Planning",
    categoryColor: "bg-blue-400",
    title: "8 Packing Hacks You Haven’t Tried Yet",
    desc: "Discover new ways to save space, stay organized, and breeze through airport security with ease.",
  },
  {
    id: 5,
    image: img5,
    trending: true,
    category: "Destination Guides",
    categoryColor: "bg-blue-600",
    title: "The Secret Beaches of Malaysia: A Local’s Guide",
    desc: "Trade the crowds for crystal waters and untouched sands with these little-known seaside escapes.",
  },
  {
    id: 6,
    image: img6,
    trending: false,
    category: "Local Tips",
    categoryColor: "bg-blue-500",
    title: "Best Laptop-Friendly Cafes in Lisbon",
    desc: "Where to work, sip great coffee, and soak in the city’s creative vibe as a digital nomad or traveler.",
  },
];
const blog = () => {
  return (
    <>
    <Navbar/>
     <section
      className="relative w-full bg-cover bg-center flex items-center justify-center py-20 px-4"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative max-w-3xl text-center z-10">
       
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
          Smart Travel Tips & <br /> Destination Guides
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 mt-4 text-sm md:text-base">
          Get inspired with local experiences, travel hacks, and destination
          insights from the TravelSync team.
        </p>

        {/* Form Section */}
        <form className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Your email"
            className="w-full sm:w-80 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
          >
            Subscribe for Updates
          </button>
        </form>
      </div>
    </section>
    <section className="py-16 px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                {blog.trending && (
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Trending
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Category Tag */}
                <span
                  className={`inline-block text-white text-xs font-medium px-3 py-1 rounded-full ${blog.categoryColor}`}
                >
                  {blog.category}
                </span>

                {/* Title */}
                <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-gray-600 text-sm">{blog.desc}</p>

                {/* Read More */}
                <a
                  href="#"
                  className="mt-4 inline-flex items-center text-blue-600 font-medium text-sm hover:underline"
                >
                  Read More <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-16 px-6 lg:px-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row transform hover:scale-[1.01] transition">
          
          {/* Left Side (Image with overlay tags) */}
          <div className="relative lg:w-1/2">
            <img
              src={editorImg}
              alt="Group Adventure Travel"
              className="w-full h-64 lg:h-full object-cover"
            />
            {/* Top-left small tag */}
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              Editor’s Pick
            </span>
        
          </div>

          {/* Right Side (Text Content with background tint) */}
          <div className="lg:w-1/2 p-8 flex flex-col justify-center bg-green-50">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 leading-snug">
              Why Group Adventure Travel is Making a Comeback
            </h2>
            <p className="mt-3 text-gray-600 text-sm lg:text-base">
              Rediscover the joy of shared journeys, new friendships, and
              unforgettable experiences on the road—here’s how to join the
              movement and make your next trip meaningful.
            </p>
            <a
              href="#"
              className="mt-5 inline-block text-blue-600 border border-blue-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition"
            >
              Read Full Story →
            </a>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default blog
